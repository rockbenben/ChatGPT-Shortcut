import React, { useContext, useState, useCallback, useMemo, useRef } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import { Empty, App, Row, Col } from "antd";
import { BasePromptCard } from "@site/src/components/PromptCard/Base";
import PromptCard from "@site/src/components/PromptCard";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import styles from "@site/src/components/PromptCard/styles.module.css";
import isEqual from "lodash/isEqual";
import { getWeight } from "@site/src/utils/formatters";

import { updateMySpaceOrder, updateCustomTags } from "@site/src/api";
import { SUPPORTED_LANGUAGES } from "@site/src/api/homepage";
import { AuthContext } from "../AuthContext";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import PromptFormModal from "./modal/PromptFormModal";
import { PromptCardSkeleton } from "@site/src/components/PromptCardSkeleton";

import FilterBar from "./myspace/FilterBar";
import TagManagerModal from "./myspace/TagManagerModal";
import SpaceItemRow from "./myspace/SpaceItemRow";
import { useSpaceItems } from "./myspace/useSpaceItems";
import { useTagAssignment } from "./myspace/useTagAssignment";
import { useFallbackSearch } from "./myspace/useFallbackSearch";
import type { CustomTag, FilterType } from "./myspace/types";

interface MySpaceProps {
  onOpenModal?: (data: any) => void;
  onDataLoaded?: (data: { totalItems: number; totalPrompts: number; totalFavorites: number; totalTags: number }) => void;
}

const MySpace: React.FC<MySpaceProps> = ({ onOpenModal, onDataLoaded }) => {
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale;
  const { userAuth, getUserAuth, syncMySpaceState, authLoading } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();

  const { removeFavorite, confirmRemoveFavorite, toggleFavorite } = useFavorite();
  const { addPrompt: addUserPrompt, updatePrompt: updateUserPrompt, confirmRemovePrompt } = useUserPrompt();

  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagManagerOpen, setTagManagerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 编辑提示词弹窗
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<any>(null);

  // 数据加载 + 模块级缓存（跨挂载即时显示）
  const { spaceItems, setSpaceItems, customTags, setCustomTags, dataProcessing, syncSpaceCache } = useSpaceItems({ userAuth, currentLanguage, onDataLoaded, messageApi });

  // 标签分配编辑会话（dropdown 关闭即提交）
  const { openTagDropdownItemId, setOpenTagDropdownItemId, dropdownEditRef, saveTagAssignment, handleToggleTag, spaceItemsRef } = useTagAssignment({
    spaceItems,
    customTags,
    setSpaceItems,
    getUserAuth,
    syncMySpaceState,
    syncSpaceCache,
    messageApi,
  });

  // 配置拖拽传感器
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // 筛选后的项目
  const filteredItems = useMemo(() => {
    let items = spaceItems;

    // 类型筛选
    if (filter !== "all") {
      items = items.filter((item) => item.type === filter);
    }

    // 标签筛选
    if (selectedTags.length > 0) {
      items = items.filter((item) => item.customTags?.some((t) => selectedTags.includes(t)));
    }

    // 搜索筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const langKeys = SUPPORTED_LANGUAGES;

      items = items.filter((item) => {
        const data = item.data;
        // 搜索顶层字段
        if (
          data?.title?.toLowerCase().includes(query) ||
          data?.description?.toLowerCase().includes(query) ||
          data?.remark?.toLowerCase().includes(query) ||
          data?.notes?.toLowerCase().includes(query)
        ) {
          return true;
        }
        // 搜索嵌套语言字段（DataCard）
        for (const lang of langKeys) {
          const langData = data?.[lang];
          if (langData?.title?.toLowerCase().includes(query) || langData?.description?.toLowerCase().includes(query) || langData?.remark?.toLowerCase().includes(query)) {
            return true;
          }
        }
        return false;
      });
    }

    return items;
  }, [spaceItems, filter, selectedTags, searchQuery]);

  // 降级搜索：本地无结果时推荐精选/社区提示词
  const { fallbackCards, fallbackSource, isFallbackLoading } = useFallbackSearch({ filteredCount: filteredItems.length, searchQuery, currentLanguage });

  // 拖拽结束
  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) {
        return;
      }

      const oldIndex = filteredItems.findIndex((item) => item.id === active.id);
      const newIndex = filteredItems.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) {
        return;
      }

      // 当有筛选条件时，需要在完整的 spaceItems 中调整顺序
      // 而不是用 filteredItems 覆盖 spaceItems
      let newSpaceItems: typeof spaceItems;

      if (filter === "all" && selectedTags.length === 0 && !searchQuery.trim()) {
        // 无筛选条件时，直接使用 filteredItems（等于 spaceItems）
        newSpaceItems = arrayMove(spaceItems, oldIndex, newIndex);
      } else {
        // 有筛选条件时，需要在完整列表中找到对应位置并调整
        const activeItem = filteredItems[oldIndex];
        const overItem = filteredItems[newIndex];

        // 在完整列表中找到实际位置
        const activeFullIndex = spaceItems.findIndex((item) => item.id === activeItem.id);
        const overFullIndex = spaceItems.findIndex((item) => item.id === overItem.id);

        if (activeFullIndex === -1 || overFullIndex === -1) {
          return;
        }

        newSpaceItems = arrayMove(spaceItems, activeFullIndex, overFullIndex);
      }

      // 乐观更新前快照旧顺序：保存失败时回滚，避免「保存失败」toast 与界面（卡片停在新位）自相矛盾。
      // 与本仓其余乐观路径（useFavorite / 投票）一致。
      const previousSpaceItems = spaceItems;
      setSpaceItems(newSpaceItems);

      // 自动保存顺序 - 保存完整列表的顺序
      try {
        const newOrder = newSpaceItems.map((item) => ({
          id: item.sourceId, // 使用 sourceId（数字）而非组合ID
          type: item.type,
          source: item.source,
        }));
        await updateMySpaceOrder(newOrder);

        // 本地同步 userAuth.data.items 顺序（不走 GET /myspace）：
        // server controller 不重排，直接写入 newOrder + 加 updatedAt，前端 reorder
        // 现有 items 即与 server 状态一致。useFavorite 用 items 做 reconcile base，
        // 不同步会导致拖完后点 ❤️ 时拖动顺序丢失。
        // await 之后重新读权威值：闭包里的渲染期快照可能早于并发的收藏操作，
        // 用它重排会把刚收藏的条目丢掉
        const auth = getUserAuth();
        if (auth?.data?.items) {
          const orderMap = new Map<string, number>();
          newOrder.forEach((it, i) => orderMap.set(`${it.type}_${it.source}_${it.id}`, i));
          const oldItems: any[] = auth.data.items;
          // 不在 newOrder 里的条目（并发收藏刚加进来的）统一取 oldItems.length，排在已知条目之后。
          // 它们之间的相对次序由 Array.sort 的稳定性保证（ES2019 起规范强制），无需额外处理。
          const reordered = [...oldItems].sort((a, b) => {
            const aKey = `${a.type}_${a.source}_${a.id}`;
            const bKey = `${b.type}_${b.source}_${b.id}`;
            return (orderMap.get(aKey) ?? oldItems.length) - (orderMap.get(bKey) ?? oldItems.length);
          });
          syncMySpaceState({ items: reordered });
        }

        messageApi.success(<Translate id="message.orderSaved">排列已保存</Translate>);
      } catch (error) {
        console.error("Failed to save order:", error);
        // 回滚乐观更新：保存失败 → 卡片回到拖动前的位置，与 toast 一致
        setSpaceItems(previousSpaceItems);
        messageApi.error(<Translate id="message.orderSaveFailed">排列保存失败</Translate>);
      }
    },
    [spaceItems, setSpaceItems, filteredItems, filter, selectedTags, searchQuery, messageApi, userAuth, syncMySpaceState],
  );

  // 编辑提示词
  const handleEditPrompt = useCallback((prompt: any) => {
    setEditingPrompt(prompt);
    setEditModalOpen(true);
  }, []);

  const handleUpdatePrompt = useCallback(
    async (values: any) => {
      if (!editingPrompt) return;
      const success = await updateUserPrompt(editingPrompt.id, values);
      if (success) {
        setEditModalOpen(false);
        setEditingPrompt(null);
      }
    },
    [editingPrompt, updateUserPrompt],
  );

  // 保存标签管理
  const handleManageTagsSave = async (tags: CustomTag[]) => {
    try {
      // 构建完整的 itemTags 对象（从当前状态）
      const newItemTags: Record<string, string[]> = {};

      spaceItems.forEach((item) => {
        if (item.customTags && item.customTags.length > 0) {
          newItemTags[item.id] = item.customTags;
        }
      });

      // 更新完整的 customTags 对象
      await updateCustomTags({
        definitions: tags,
        itemTags: newItemTags,
      });

      // 立即更新本地状态
      setCustomTags(tags);
      // 本地同步 userAuth.data.customTags：让 user/index.tsx 导出、useFavorite 拼 lscache 时读到最新 definitions。
      // items[i].tags 可能含已删除标签的孤儿 id，server 端会清理，本地短暂保留无视觉影响
      //（消费者从 customTags definitions 查显示信息，孤儿 id 查不到自然不显示）。
      syncMySpaceState({ customTags: tags });
      // 镜像进模块缓存：item 分配未变（spaceItemsRef）、definitions 变为 tags
      syncSpaceCache(spaceItemsRef.current, tags);

      setTagManagerOpen(false);
      messageApi.success(<Translate id="message.tagsUpdated">标签已更新</Translate>);
    } catch (error) {
      console.error("Failed to update tags:", error);
      messageApi.error(<Translate id="message.tagsUpdateFailed">标签更新失败</Translate>);
    }
  };

  const handleDeletePrompt = useCallback(
    (promptId: number) => {
      confirmRemovePrompt(promptId);
    },
    [confirmRemovePrompt],
  );

  // 转换不可用的收藏提示词为私有提示词
  const handleConvertToPrivate = useCallback(
    async (data: any) => {
      try {
        const currentLanguage = i18n.currentLocale;
        const itemData = data[currentLanguage] || data["zh-Hans"] || data["en"];
        const isDataCard = !!(itemData && itemData.title);

        const promptData = {
          title: isDataCard ? itemData.title : data.title,
          description: isDataCard ? itemData.prompt : data.description,
          remark: isDataCard ? itemData.remark : data.remark,
          notes: `从社区提示词转换（原ID: ${data.id}）`,
          share: false,
        };

        const success = await addUserPrompt(promptData);
        if (success) {
          messageApi.success(<Translate id="message.convertToPrivate.success">已转为私有提示词</Translate>);
          // 用户点击“转为私有”按钮（FavoriteCard 失效横幅）即已表达意图，
          // 直接移除收藏；此处若用 confirmRemoveFavorite 会在转换成功后再弹一次确认框。
          // removeFavorite 自己吞错并提示，所以必须看返回值：移除失败时该条收藏仍在列表里，
          // 用户再点一次「转为私有」就会创建第二份一模一样的私有提示词，且无从分辨。
          const removed = await removeFavorite(data.id, !isDataCard);
          if (!removed) {
            messageApi.warning(<Translate id="message.convertToPrivate.favoriteKept">已创建私有提示词，但原收藏未能移除，请手动删除以免重复</Translate>);
          }
        }
      } catch (error) {
        console.error("Failed to convert prompt:", error);
        messageApi.error(<Translate id="message.convertToPrivate.error">转换失败，请稍后重试</Translate>);
      }
    },
    [addUserPrompt, removeFavorite, messageApi, i18n],
  );

  // 移除收藏
  const handleRemoveFavorite = useCallback(
    (id: number, isComm?: boolean) => {
      confirmRemoveFavorite(id, isComm);
    },
    [confirmRemoveFavorite],
  );

  // 统一的加载状态：AuthContext 加载中 或 数据处理中
  if (authLoading || dataProcessing) {
    return <PromptCardSkeleton count={6} />;
  }

  // 如果没有用户数据，显示骨架屏
  if (!userAuth?.data) {
    return <PromptCardSkeleton count={6} />;
  }

  return (
    <>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        customTags={customTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        onManageTags={() => setTagManagerOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <Row gutter={[16, 16]}>
            {filteredItems.length === 0 ? (
              <>
                {fallbackCards.length > 0 ? (
                  <>
                    <Col xs={24}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<Translate id="myspace.fallbackHint">未找到匹配结果，为你推荐：</Translate>} style={{ margin: "1rem 0 0" }} />
                    </Col>
                    {fallbackCards.map((card) => {
                      if (fallbackSource === "community") {
                        const isFav = userAuth?.data?.favorites?.commLoves?.includes(card.id);
                        return (
                          <Col key={card.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                            <PromptCard
                              type="community"
                              data={card}
                              isFavorite={isFav}
                              isLoggedIn={true}
                              onToggleFavorite={toggleFavorite}
                              onOpenModal={onOpenModal}
                            />
                          </Col>
                        );
                      }
                      return (
                        <Col key={card.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                          <PromptCard type="data" data={card} copyCount={getWeight(card)} isLoggedIn={true} isFavorite={userAuth?.data?.favorites?.loves?.includes(card.id)} onToggleFavorite={toggleFavorite} onOpenModal={onOpenModal} />
                        </Col>
                      );
                    })}
                  </>
                ) : isFallbackLoading ? (
                  <Col xs={24}>
                    <PromptCardSkeleton count={4} />
                  </Col>
                ) : (
                  <Col xs={24}>
                    <BasePromptCard>
                      <div className={styles.cardBodyHeight} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
                        <Empty
                          description={
                            searchQuery.trim() ? (
                              <Translate id="showcase.usersList.noResult">未找到相关结果，试试其他关键词</Translate>
                            ) : filter === "all" ? (
                              <Translate id="message.noSpaceItems">暂无内容，去创建提示词或收藏喜欢的吧</Translate>
                            ) : filter === "prompt" ? (
                              <Translate id="message.noPrompts">暂无提示词，去创建一个吧</Translate>
                            ) : (
                              <Translate id="message.noFavorites">暂无收藏，去发现喜欢的提示词吧</Translate>
                            )
                          }
                        />
                      </div>
                    </BasePromptCard>
                  </Col>
                )}
              </>
            ) : (
              <SortableContext items={filteredItems.map((item) => item.id)}>
                {filteredItems.map((item) => (
                  <SpaceItemRow
                    key={item.id}
                    item={item}
                    customTags={customTags}
                    isTagDropdownOpen={openTagDropdownItemId === item.id}
                    onToggleTag={handleToggleTag}
                    setOpenTagDropdownItemId={setOpenTagDropdownItemId}
                    setTagManagerOpen={setTagManagerOpen}
                    saveTagAssignment={saveTagAssignment}
                    dropdownEditRef={dropdownEditRef}
                    handleDeletePrompt={handleDeletePrompt}
                    handleEditPrompt={handleEditPrompt}
                    handleRemoveFavorite={handleRemoveFavorite}
                    handleConvertToPrivate={handleConvertToPrivate}
                    onOpenModal={onOpenModal}
                  />
                ))}
              </SortableContext>
            )}
          </Row>
        </DndContext>
      }

      <TagManagerModal open={tagManagerOpen} onClose={() => setTagManagerOpen(false)} tags={customTags} onSave={handleManageTagsSave} />

      <PromptFormModal open={editModalOpen} mode="edit" loading={false} initialValues={editingPrompt} onSubmit={handleUpdatePrompt} onClose={() => setEditModalOpen(false)} />
    </>
  );
};

function areEqual(prevProps: MySpaceProps, nextProps: MySpaceProps) {
  return isEqual(prevProps, nextProps);
}

export default React.memo(MySpace, areEqual);
