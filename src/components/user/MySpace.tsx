import React, { useContext, useState, useEffect, useCallback, useMemo } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate, { translate } from "@docusaurus/Translate";
import { Empty, App, Row, Col, Segmented, Tag, Button, Space, Modal, Input, Flex, Tooltip, Dropdown, ConfigProvider } from "antd";
import { AppstoreOutlined, EditOutlined, HeartOutlined, TagOutlined, PlusOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { BasePromptCard } from "@site/src/components/PromptCard/Base";
import PromptCard from "@site/src/components/PromptCard";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import styles from "@site/src/components/PromptCard/styles.module.css";
import isEqual from "lodash/isEqual";
import { getWeight } from "@site/src/utils/formatters";

import { getPrompts, updateMySpaceOrder, updateCustomTags } from "@site/src/api";
import { getCache, removeCache, getPromptCacheKey } from "@site/src/utils/cache";
import { AuthContext } from "../AuthContext";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import PromptFormModal from "./modal/PromptFormModal";
import { PromptCardSkeleton } from "@site/src/components/PromptCardSkeleton";

// ==================== 类型定义 ====================

// 自定义标签类型
interface CustomTag {
  id: string;
  name: string;
  color: string;
  order: number;
}

interface MySpaceProps {
  onOpenModal?: (data: any) => void;
  onDataLoaded?: (data: { totalItems: number; totalPrompts: number; totalFavorites: number; totalTags: number }) => void;
}

type FilterType = "all" | "prompt" | "favorite";

// SearchBar 样式主题
const searchBarTheme = {
  components: {
    Input: {
      borderRadius: 20,
      controlHeight: 32,
      colorBorder: "transparent",
      activeBorderColor: "transparent",
      hoverBorderColor: "var(--ifm-color-emphasis-300)",
      activeShadow: "0 0 0 2px var(--ifm-color-primary-lighter)",
      colorBgContainer: "var(--site-color-background)",
    },
  },
};

// ==================== 辅助组件 ====================

const FilterBar: React.FC<{
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  customTags: CustomTag[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  onManageTags: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}> = ({ filter, setFilter, customTags, selectedTags, setSelectedTags, onManageTags, searchQuery, setSearchQuery }) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  // 同步外部searchQuery变化到本地inputValue
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleSearch = useCallback(() => {
    setSearchQuery(inputValue);
  }, [inputValue, setSearchQuery]);

  // 清空时立即触发搜索
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);
      if (val === "") {
        setSearchQuery("");
      }
    },
    [setSearchQuery]
  );

  const filterOptions = [
    {
      label: (
        <>
          <AppstoreOutlined /> <Translate id="myspace.filter.all">全部</Translate>
        </>
      ),
      value: "all",
    },
    {
      label: (
        <>
          <EditOutlined /> <Translate id="myspace.filter.prompts">提示词</Translate>
        </>
      ),
      value: "prompt",
    },
    {
      label: (
        <>
          <HeartOutlined /> <Translate id="myspace.filter.favorites">收藏</Translate>
        </>
      ),
      value: "favorite",
    },
  ];

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      // If already selected, deselect it
      setSelectedTags([]);
    } else {
      // Single select: replace with this tag only
      setSelectedTags([tagId]);
    }
  };

  return (
    <Flex wrap="wrap" gap="small" align="center" style={{ marginBottom: 16 }}>
      <Segmented options={filterOptions} value={filter} onChange={(value) => setFilter(value as FilterType)} />

      {customTags.length > 0 && (
        <Flex wrap="wrap" gap="small" style={{ marginLeft: 8 }}>
          {customTags.map((tag) => (
            <Tag
              key={tag.id}
              color={tag.color}
              style={{
                cursor: "pointer",
                opacity: selectedTags.includes(tag.id) ? 1 : 0.7,
                boxShadow: selectedTags.includes(tag.id) ? "0 0 0 2px currentColor" : "none",
              }}
              onClick={() => toggleTag(tag.id)}>
              {tag.name}
            </Tag>
          ))}
        </Flex>
      )}

      <Tooltip title={translate({ id: "myspace.manageTags", message: "管理标签" })}>
        <Button type="text" icon={<TagOutlined />} onClick={onManageTags} size="small" />
      </Tooltip>

      <ConfigProvider theme={searchBarTheme}>
        <Input
          placeholder={translate({ id: "myspace.search.placeholder", message: "搜索我的空间..." })}
          value={inputValue}
          onChange={handleChange}
          onPressEnter={handleSearch}
          allowClear
          style={{ marginLeft: "auto", width: "auto" }}
          suffix={<Button type="text" icon={<SearchOutlined />} onClick={handleSearch} style={{ margin: -8 }} />}
        />
      </ConfigProvider>
    </Flex>
  );
};

// ==================== 标签管理弹窗 ====================

// Ant Design 预设颜色（支持深浅模式）
const PRESET_COLORS = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];

const TagManagerModal: React.FC<{
  open: boolean;
  onClose: () => void;
  tags: CustomTag[];
  onSave: (tags: CustomTag[]) => void;
}> = ({ open, onClose, tags, onSave }) => {
  const [localTags, setLocalTags] = useState<CustomTag[]>(tags);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(PRESET_COLORS[4]); // gold as default

  useEffect(() => {
    setLocalTags(tags);
  }, [tags, open]);

  const handleAddTag = () => {
    if (!newTagName.trim()) return;

    const newTag: CustomTag = {
      id: `tag_${Date.now()}`,
      name: newTagName.trim(),
      color: newTagColor,
      order: localTags.length,
    };
    setLocalTags([...localTags, newTag]);
    setNewTagName("");
    // 自动切换到下一个颜色
    const currentIndex = PRESET_COLORS.indexOf(newTagColor);
    setNewTagColor(PRESET_COLORS[(currentIndex + 1) % PRESET_COLORS.length]);
  };

  const handleDeleteTag = (tagId: string) => {
    setLocalTags(localTags.filter((t) => t.id !== tagId));
  };

  const handleUpdateTagName = (tagId: string, name: string) => {
    setLocalTags(localTags.map((t) => (t.id === tagId ? { ...t, name } : t)));
  };

  const handleUpdateTagColor = (tagId: string, color: string) => {
    setLocalTags(localTags.map((t) => (t.id === tagId ? { ...t, color } : t)));
  };

  const handleSave = () => {
    onSave(localTags);
    onClose();
  };

  // 颜色选择器组件
  const ColorSelector = ({ value, onChange }: { value: string; onChange: (color: string) => void }) => (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: PRESET_COLORS.map((color) => ({
          key: color,
          label: (
            <Tag color={color} style={{ margin: 0, cursor: "pointer" }}>
              {color}
            </Tag>
          ),
          onClick: () => onChange(color),
        })),
      }}>
      <Tag color={value} style={{ cursor: "pointer", minWidth: 60 }}>
        {value}
      </Tag>
    </Dropdown>
  );

  return (
    <Modal
      title={<Translate id="myspace.tagManager.title">管理自定义标签</Translate>}
      open={open}
      onCancel={onClose}
      onOk={handleSave}
      okText={<Translate id="action.save">保存</Translate>}
      cancelText={<Translate id="action.cancel">取消</Translate>}>
      <Space orientation="vertical" style={{ width: "100%" }}>
        <Flex gap="small">
          <Input
            placeholder={translate({ id: "myspace.tagManager.namePlaceholder", message: "标签名称" })}
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onPressEnter={handleAddTag}
            style={{ flex: 1 }}
          />
          <ColorSelector value={newTagColor} onChange={setNewTagColor} />
          <Button icon={<PlusOutlined />} onClick={handleAddTag}>
            <Translate id="action.add">添加</Translate>
          </Button>
        </Flex>

        <div style={{ marginTop: 16 }}>
          {localTags.map((tag) => (
            <Flex key={tag.id} align="center" gap="small" style={{ marginBottom: 8 }}>
              <Input value={tag.name} onChange={(e) => handleUpdateTagName(tag.id, e.target.value)} style={{ flex: 1 }} />
              <ColorSelector value={tag.color} onChange={(color) => handleUpdateTagColor(tag.id, color)} />
              <Button icon={<DeleteOutlined />} danger size="small" onClick={() => handleDeleteTag(tag.id)} />
            </Flex>
          ))}
          {localTags.length === 0 && <Empty description={<Translate id="myspace.tagManager.empty">暂无自定义标签</Translate>} />}
        </div>
      </Space>
    </Modal>
  );
};

// ==================== 主组件 ====================

const MySpace: React.FC<MySpaceProps> = ({ onOpenModal, onDataLoaded }) => {
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const { userAuth, refreshUserAuth } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();

  const { confirmRemoveFavorite } = useFavorite();
  const { addPrompt: addUserPrompt, updatePrompt: updateUserPrompt, confirmRemovePrompt } = useUserPrompt();

  const [spaceItems, setSpaceItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<CustomTag[]>([]);
  const [tagManagerOpen, setTagManagerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 编辑提示词弹窗
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<any>(null);
  const [hasDragged, setHasDragged] = useState(false);

  // 配置拖拽传感器
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 加载数据 - 直接使用 AuthContext 提供的数据
  useEffect(() => {
    if (!userAuth?.data) return;
    let isMounted = true;

    const fetchData = async () => {
      if (!userAuth?.data) return;

      setLoading(true);
      try {
        // ⭐ 直接使用 AuthContext 提供的 items（后端已排序，AuthProvider 已过滤）
        const { items, customTags: tagsArray } = userAuth.data;

        // 设置自定义标签
        if (isMounted) {
          setCustomTags(tagsArray || []);
        }

        // 从 items 提取需要获取详细数据的 IDs
        const promptIds = items.filter((item) => item.type === "prompt").map((item) => item.id);
        const cardIds = items.filter((item) => item.source === "card").map((item) => item.id);
        const commuIds = items.filter((item) => item.source === "community").map((item) => item.id);

        // 批量获取详细数据
        const [userPromptsData, cardsData, commusData] = await Promise.all([
          promptIds.length > 0 ? getPrompts("userprompts", promptIds) : Promise.resolve([]),
          cardIds.length > 0 ? getPrompts("cards", cardIds, currentLanguage) : Promise.resolve([]),
          commuIds.length > 0 ? getPrompts("commus", commuIds) : Promise.resolve([]),
        ]);

        // 创建详细数据映射
        const promptsMap = new Map(userPromptsData.map((p) => [p.id, p]));
        const cardsMap = new Map(cardsData.map((c) => [c.id, c]));
        const commusMap = new Map(commusData.map((c) => [c.id, c]));

        // ⭐ 直接按照 items 的顺序构建 allItems（保持后端排序）
        const allItems = items
          .map((item) => {
            let detailData;

            if (item.type === "prompt") {
              detailData = promptsMap.get(item.id);
            } else if (item.source === "card") {
              detailData = cardsMap.get(item.id);
            } else if (item.source === "community") {
              detailData = commusMap.get(item.id);
            }

            if (!detailData) return null;

            return {
              id: `${item.type}_${item.source}_${item.id}`,
              type: item.type,
              source: item.source,
              sourceId: item.id,
              data: detailData,
              customTags: item.tags || [],
            };
          })
          .filter(Boolean);

        if (isMounted) {
          setSpaceItems(allItems);

          // 通知父组件数据已加载（使用实际获取到数据的数量）
          if (onDataLoaded) {
            const actualPrompts = allItems.filter((item) => item.type === "prompt").length;
            const actualFavorites = allItems.filter((item) => item.type === "favorite").length;
            onDataLoaded({
              totalItems: allItems.length,
              totalPrompts: actualPrompts,
              totalFavorites: actualFavorites,
              totalTags: (tagsArray || []).length,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch MySpace data:", error);
        if (isMounted) {
          messageApi.error("加载数据失败");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [userAuth, currentLanguage, onDataLoaded, messageApi]);

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
      const langKeys = ["zh", "en", "ja", "ko", "de", "fr", "es", "it", "ru", "pt", "hi", "ar", "bn"];

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

  // 拖拽结束
  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) {
        setHasDragged(false);
        return;
      }

      const oldIndex = filteredItems.findIndex((item) => item.id === active.id);
      const newIndex = filteredItems.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) {
        setHasDragged(false);
        return;
      }

      const newItems = arrayMove(filteredItems, oldIndex, newIndex);
      setSpaceItems(newItems);
      setHasDragged(true);

      // 自动保存顺序
      try {
        const newOrder = newItems.map((item) => ({
          id: item.sourceId, // 使用 sourceId（数字）而非组合ID
          type: item.type,
          source: item.source,
        }));
        await updateMySpaceOrder(newOrder);

        // 刷新 AuthContext 数据
        refreshUserAuth();

        messageApi.success("顺序已保存");
      } catch (error) {
        console.error("Failed to save order:", error);
        messageApi.error("保存顺序失败");
      }
    },
    [filteredItems, refreshUserAuth, messageApi]
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
    [editingPrompt, updateUserPrompt]
  );

  // 管理标签（打开弹窗）
  const handleManageTags = useCallback(() => {
    setTagManagerOpen(true);
  }, []);

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

      // 刷新 AuthContext 数据
      refreshUserAuth();

      setTagManagerOpen(false);
      messageApi.success(<Translate id="message.tagsUpdated">标签已更新</Translate>);
    } catch (error) {
      console.error("Failed to update tags:", error);
      messageApi.error(<Translate id="message.tagsUpdateFailed">标签更新失败</Translate>);
    }
  };

  // 删除提示词 - 显示确认对话框并删除
  const handleDeletePrompt = useCallback(
    (promptId: string) => {
      confirmRemovePrompt(Number(promptId));
    },
    [confirmRemovePrompt]
  );

  // 转换不可用的收藏提示词为私有提示词
  const handleConvertToPrivate = useCallback(
    async (data: any) => {
      try {
        const currentLanguage = i18n.currentLocale.split("-")[0];
        const itemData = data[currentLanguage] || data["zh"] || data["en"];
        const isDataCard = !!(itemData && itemData.title);

        // 构建提示词数据
        const promptData = {
          title: isDataCard ? itemData.title : data.title,
          description: isDataCard ? itemData.prompt : data.description,
          remark: isDataCard ? itemData.remark : data.remark,
          notes: `从社区提示词转换（原ID: ${data.id}）`,
          share: false, // 设为私有
        };

        const success = await addUserPrompt(promptData);
        if (success) {
          messageApi.success(<Translate id="message.convertToPrivate.success">已转为私有提示词</Translate>);
          // 转换成功后，从收藏中移除原提示词
          await confirmRemoveFavorite(data.id, !isDataCard);
        }
      } catch (error) {
        console.error("Failed to convert prompt:", error);
        messageApi.error(<Translate id="message.convertToPrivate.error">转换失败，请稍后重试</Translate>);
      }
    },
    [addUserPrompt, confirmRemoveFavorite, messageApi, i18n]
  );

  // 移除收藏
  const handleRemoveFavorite = useCallback(
    (id: string, isComm?: boolean) => {
      confirmRemoveFavorite(Number(id), isComm);
    },
    [confirmRemoveFavorite]
  );

  // 切换项目标签
  const handleToggleTag = useCallback(
    async (itemId: string, tagId: string) => {
      const item = spaceItems.find((i) => i.id === itemId);
      if (!item) return;

      const currentTags = item.customTags || [];
      let newTags: string[];

      if (currentTags.includes(tagId)) {
        newTags = currentTags.filter((t) => t !== tagId);
      } else {
        newTags = [...currentTags, tagId];
      }

      // 乐观更新 UI
      setSpaceItems((items) => items.map((i) => (i.id === itemId ? { ...i, customTags: newTags } : i)));

      // 保存到服务器
      try {
        // 构建完整的 itemTags 对象（从当前状态）
        const newItemTags: Record<string, string[]> = {};

        spaceItems.forEach((item) => {
          if (item.id === itemId) {
            newItemTags[item.id] = newTags;
          } else if (item.customTags && item.customTags.length > 0) {
            newItemTags[item.id] = item.customTags;
          }
        });

        // 调用 API 更新
        await updateCustomTags({
          definitions: customTags,
          itemTags: newItemTags,
        });
      } catch (error) {
        console.error("Failed to update item tags:", error);
        messageApi.error("标签更新失败");
        // 恢复UI
        setSpaceItems((items) => items.map((i) => (i.id === itemId ? { ...i, customTags: currentTags } : i)));
      }
    },
    [spaceItems, customTags, messageApi]
  );

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

      {loading ? (
        <PromptCardSkeleton count={6} />
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <Row gutter={[16, 16]}>
            {filteredItems.length === 0 ? (
              <Col xs={24}>
                <BasePromptCard>
                  <div className={styles.cardBodyHeight} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
                    <Empty
                      description={
                        filter === "all" ? (
                          <Translate id="message.noSpaceItems">暂无内容，请添加提示词或收藏。</Translate>
                        ) : filter === "prompt" ? (
                          <Translate id="message.noPrompts">尚未提交任何提示词，请添加提示词。</Translate>
                        ) : (
                          <Translate id="message.noFavorites">尚未收藏任何提示词，请添加收藏。</Translate>
                        )
                      }
                    />
                  </div>
                </BasePromptCard>
              </Col>
            ) : (
              <SortableContext items={filteredItems.map((item) => item.id)}>
                {filteredItems.map((item) => {
                  // 构建标签分配菜单
                  const tagMenuItems = customTags.map((tag) => ({
                    key: tag.id,
                    label: (
                      <Flex align="center" gap="small">
                        <Tag color={tag.color} style={{ margin: 0 }}>
                          {tag.name}
                        </Tag>
                        {item.customTags?.includes(tag.id) && <span>✓</span>}
                      </Flex>
                    ),
                    onClick: (info: any) => {
                      info.domEvent?.stopPropagation();
                      handleToggleTag(item.id, tag.id);
                    },
                  }));

                  // 始终显示标签按钮，没有标签时点击打开管理弹窗
                  const extraActions = (
                    <Tooltip title={translate({ id: "myspace.assignTag", message: "分配标签" })}>
                      {customTags.length > 0 ? (
                        <Dropdown menu={{ items: tagMenuItems }} trigger={["click"]}>
                          <Button type="text" size="small" icon={<TagOutlined />} onClick={(e) => e.stopPropagation()} />
                        </Dropdown>
                      ) : (
                        <Button
                          type="text"
                          size="small"
                          icon={<TagOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            setTagManagerOpen(true);
                          }}
                        />
                      )}
                    </Tooltip>
                  );

                  return (
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                      <PromptCard
                        type={item.type === "prompt" ? "user" : "favorite"}
                        data={item.data}
                        sortableId={item.id}
                        copyCount={getWeight(item.data)}
                        onDelete={item.type === "prompt" ? handleDeletePrompt : undefined}
                        onEdit={item.type === "prompt" ? () => handleEditPrompt(item.data) : undefined}
                        onRemoveFavorite={item.type === "favorite" ? handleRemoveFavorite : undefined}
                        onConvertToPrivate={item.type === "favorite" ? handleConvertToPrivate : undefined}
                        onOpenModal={onOpenModal}
                        extraActions={extraActions}
                      />
                    </Col>
                  );
                })}
              </SortableContext>
            )}
          </Row>
        </DndContext>
      )}

      <TagManagerModal open={tagManagerOpen} onClose={() => setTagManagerOpen(false)} tags={customTags} onSave={handleManageTagsSave} />

      <PromptFormModal open={editModalOpen} mode="edit" loading={false} initialValues={editingPrompt} onSubmit={handleUpdatePrompt} onClose={() => setEditModalOpen(false)} />
    </>
  );
};

function areEqual(prevProps: MySpaceProps, nextProps: MySpaceProps) {
  return isEqual(prevProps, nextProps);
}

export default React.memo(MySpace, areEqual);
