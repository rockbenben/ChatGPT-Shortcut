import React, { useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
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
import { getCommPrompts } from "@site/src/api/prompts";
import { searchCardsLocally } from "@site/src/api/homepage";
import { SUPPORTED_LANGUAGES } from "@site/src/data/constants";
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
    [setSearchQuery],
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
                opacity: selectedTags.includes(tag.id) ? 1 : 0.55,
                transition: "opacity 0.12s cubic-bezier(0.16,1,0.3,1)",
              }}
              onClick={() => toggleTag(tag.id)}>
              {tag.name}
            </Tag>
          ))}
        </Flex>
      )}

      <Button type="text" icon={<TagOutlined />} onClick={onManageTags} size="small">
        <Translate id="myspace.manageTags">管理标签</Translate>
      </Button>

      <ConfigProvider theme={searchBarTheme}>
        <Input
          placeholder={translate({ id: "input.search.placeholder", message: "搜索：写作、翻译、编程…" })}
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

// ==================== 模块级缓存（跨挂载保持，用于视图切换时即时显示） ====================
let _spaceItemsCache: {
  items: any[];
  tags: CustomTag[];
  ref: { userId: number; hash: string; structuralHash: string };
} | null = null;

// ==================== Memoized row ====================

// 每个 item 一个 row 组件，让 React.memo 形成边界：
// 不抽出去时 MySpace 每次 re-render（点 favorite/搜索/切 filter/开 dropdown）都会重建
// extraActions JSX + tagMenuItems 数组 + 内联 onEdit 闭包，让 PromptCard 的 React.memo 全失败。
// 抽出后只有 props 真变的 row 才 re-render（典型：只有当前打开/切换 dropdown 的那张卡）。
interface SpaceItemRowProps {
  item: any;
  customTags: CustomTag[];
  isTagDropdownOpen: boolean;
  onToggleTag: (itemId: string, tagId: string) => void;
  setOpenTagDropdownItemId: (id: string | null) => void;
  setTagManagerOpen: (open: boolean) => void;
  saveTagAssignment: () => void;
  dropdownEditRef: React.MutableRefObject<{ itemId: string; originalTags: string[] } | null>;
  handleDeletePrompt: (id: number) => void;
  handleEditPrompt: (data: any) => void;
  handleRemoveFavorite: (id: number, isComm?: boolean) => void;
  handleConvertToPrivate: (data: any) => void;
  onOpenModal?: (data: any) => void;
}

const SpaceItemRow = React.memo<SpaceItemRowProps>(
  ({
    item,
    customTags,
    isTagDropdownOpen,
    onToggleTag,
    setOpenTagDropdownItemId,
    setTagManagerOpen,
    saveTagAssignment,
    dropdownEditRef,
    handleDeletePrompt,
    handleEditPrompt,
    handleRemoveFavorite,
    handleConvertToPrivate,
    onOpenModal,
  }) => {
    const hasAnyTag = (item.customTags?.length || 0) > 0;

    const tagMenuItems = useMemo(
      () => [
        ...customTags.map((tag) => {
          const isAssigned = item.customTags?.includes(tag.id);
          return {
            key: tag.id,
            label: (
              <Flex align="center" justify="space-between" gap="small" style={{ minWidth: 160 }}>
                <Tag color={tag.color} style={{ margin: 0, opacity: isAssigned ? 1 : 0.55 }}>
                  {tag.name}
                </Tag>
                <span
                  aria-hidden
                  style={{
                    color: isAssigned ? "var(--site-color-tag-selected-text)" : "transparent",
                    fontSize: 14,
                    fontWeight: 600,
                    minWidth: 16,
                    textAlign: "right",
                    lineHeight: 1,
                  }}>
                  ✓
                </span>
              </Flex>
            ),
            onClick: (info: any) => {
              info.domEvent?.stopPropagation();
              onToggleTag(item.id, tag.id);
            },
          };
        }),
        { type: "divider" as const },
        {
          key: "__manage",
          label: (
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--site-color-text-tertiary)" }}>
              <Translate id="myspace.manageTags">管理标签</Translate>
            </span>
          ),
          onClick: (info: any) => {
            info.domEvent?.stopPropagation();
            saveTagAssignment();
            setOpenTagDropdownItemId(null);
            setTagManagerOpen(true);
          },
        },
      ],
      [customTags, item.id, item.customTags, onToggleTag, saveTagAssignment, setOpenTagDropdownItemId, setTagManagerOpen],
    );

    const extraActions = (
      <Tooltip title={translate({ id: "myspace.assignTag", message: "分配标签" })}>
        {customTags.length > 0 ? (
          <Dropdown
            menu={{ items: tagMenuItems }}
            trigger={["click"]}
            open={isTagDropdownOpen}
            onOpenChange={(open, info) => {
              if (!open && info?.source === "menu") return;
              if (open) {
                dropdownEditRef.current = { itemId: item.id, originalTags: [...(item.customTags || [])] };
                setOpenTagDropdownItemId(item.id);
              } else {
                setOpenTagDropdownItemId(null);
                saveTagAssignment();
              }
            }}>
            <Button
              type="text"
              size="small"
              icon={<TagOutlined style={hasAnyTag ? { color: "var(--site-color-tag-selected-text)" } : undefined} />}
              onClick={(e) => e.stopPropagation()}
            />
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
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <PromptCard
          type={item.type === "prompt" ? "user" : "favorite"}
          data={item.data}
          sortableId={item.id}
          copyCount={getWeight(item.data)}
          onDelete={item.type === "prompt" ? handleDeletePrompt : undefined}
          onEdit={item.type === "prompt" ? handleEditPrompt : undefined}
          onRemoveFavorite={item.type === "favorite" ? handleRemoveFavorite : undefined}
          onConvertToPrivate={item.type === "favorite" ? handleConvertToPrivate : undefined}
          onOpenModal={onOpenModal}
          extraActions={extraActions}
        />
      </Col>
    );
  },
);
SpaceItemRow.displayName = "SpaceItemRow";

// ==================== 主组件 ====================

const MySpace: React.FC<MySpaceProps> = ({ onOpenModal, onDataLoaded }) => {
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale;
  const { userAuth, refreshUserAuth, syncMySpaceState, authLoading } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();

  const { addFavorite, confirmRemoveFavorite } = useFavorite();
  const { addPrompt: addUserPrompt, updatePrompt: updateUserPrompt, confirmRemovePrompt } = useUserPrompt();

  // 从模块缓存初始化（仅同一用户且数据结构未变时有效），避免 explore→collection 切换时重新加载
  // 需要验证结构哈希：如果用户在 explore 视图中添加/删除了收藏，缓存就失效
  // 一次性计算：原写法 validCache 在函数体顶部，items.map+join 每次 re-render 都会跑，
  // 但只在 mount 时被 useState/useRef 用作初始值，subsequent render 重算无意义
  const initialCacheRef = useRef<{ items: any[]; tags: CustomTag[]; ref: { userId: number; hash: string; structuralHash: string } | null } | null>(null);
  if (initialCacheRef.current === null) {
    const userId = userAuth?.data?.id;
    const items = userAuth?.data?.items || [];
    const structuralHash = items.map((item: any) => `${item.type}_${item.source}_${item.id}`).join(",");
    const validCache = _spaceItemsCache && _spaceItemsCache.ref?.userId === userId && _spaceItemsCache.ref?.structuralHash === structuralHash;
    initialCacheRef.current = validCache
      ? { items: _spaceItemsCache!.items, tags: _spaceItemsCache!.tags, ref: _spaceItemsCache!.ref }
      : { items: [], tags: [], ref: null };
  }

  const [spaceItems, setSpaceItems] = useState<any[]>(initialCacheRef.current.items);
  const [dataProcessing, setDataProcessing] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<CustomTag[]>(initialCacheRef.current.tags);
  const [tagManagerOpen, setTagManagerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // 受控管理"哪张卡片的 tag dropdown 当前展开"——为了 multi-select：点 menu item 不关闭，点外面或 manage 才关
  const [openTagDropdownItemId, setOpenTagDropdownItemId] = useState<string | null>(null);

  // 降级搜索：精选/社区提示词推荐
  const [fallbackCards, setFallbackCards] = useState<any[]>([]);
  const [fallbackSource, setFallbackSource] = useState<"curated" | "community">("curated");
  const [isFallbackLoading, setIsFallbackLoading] = useState(false);

  // 编辑提示词弹窗
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<any>(null);

  // 跟踪已加载的用户数据，避免重复加载
  const lastLoadedRef = useRef<{ userId: number; hash: string; structuralHash: string } | null>(initialCacheRef.current.ref);

  // 配置拖拽传感器
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // 加载数据 - 直接使用 AuthContext 提供的数据
  useEffect(() => {
    if (!userAuth?.data) {
      setSpaceItems([]);
      return;
    }

    const items = userAuth.data.items || [];
    const currentUserId = userAuth.data.id;

    // 结构哈希（增删/排序变化）与完整哈希（含 updatedAt）分离
    const structuralHash = items.map((item: any) => `${item.type}_${item.source}_${item.id}`).join(",");
    const currentHash = items.map((item: any) => `${item.type}_${item.source}_${item.id}_${item.updatedAt || ""}`).join(",");

    // 用户切换时，重置状态避免显示上一个用户的数据
    if (lastLoadedRef.current?.userId !== currentUserId) {
      lastLoadedRef.current = null;
      _spaceItemsCache = null;
      setSpaceItems([]);
    }

    // 完全相同（含 updatedAt）：跳过
    if (lastLoadedRef.current?.userId === currentUserId && lastLoadedRef.current?.hash === currentHash && spaceItems.length > 0) {
      setDataProcessing(false);
      return;
    }

    // 结构不变且已有数据时，静默刷新（不显示骨架屏）
    const isSilentRefresh = lastLoadedRef.current?.userId === currentUserId && lastLoadedRef.current?.structuralHash === structuralHash && spaceItems.length > 0;

    let isMounted = true;

    const fetchData = async () => {
      if (!userAuth?.data) return;

      // 仅在首次加载或结构变化时显示骨架屏
      if (!isSilentRefresh) {
        setDataProcessing(true);
      }

      try {
        const { items, customTags: tagsArray } = userAuth.data;

        if (isMounted) {
          setCustomTags(tagsArray || []);
        }

        // 从 items 提取需要获取详细数据的 IDs
        const promptIds = items.filter((item) => item.type === "prompt").map((item) => item.id);
        const cardIds = items.filter((item) => item.source === "card").map((item) => item.id);
        const commuIds = items.filter((item) => item.source === "community").map((item) => item.id);

        // 批量获取详细数据（AuthProvider 已预取，大部分会命中缓存）
        const [userPromptsData, cardsData, commusData] = await Promise.all([
          promptIds.length > 0 ? getPrompts("userprompts", promptIds) : Promise.resolve([]),
          cardIds.length > 0 ? getPrompts("cards", cardIds, currentLanguage) : Promise.resolve([]),
          commuIds.length > 0 ? getPrompts("commus", commuIds) : Promise.resolve([]),
        ]);

        // 创建详细数据映射
        const promptsMap = new Map(userPromptsData.map((p) => [p.id, p]));
        const cardsMap = new Map(cardsData.map((c) => [c.id, c]));
        const commusMap = new Map(commusData.map((c) => [c.id, c]));

        // 直接按照 items 的顺序构建 allItems（保持后端排序）
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
          const newRef = { userId: currentUserId, hash: currentHash, structuralHash };
          lastLoadedRef.current = newRef;

          // 更新模块级缓存，供下次挂载时即时显示
          _spaceItemsCache = { items: allItems, tags: tagsArray || [], ref: newRef };

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
          setDataProcessing(false);
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

  // 降级搜索：本地无结果时搜索精选提示词库，精选也无结果则搜索社区
  useEffect(() => {
    if (filteredItems.length > 0 || !searchQuery.trim()) {
      setFallbackCards([]);
      return;
    }

    let cancelled = false;
    setIsFallbackLoading(true);

    (async () => {
      try {
        const data = await searchCardsLocally([], searchQuery, currentLanguage);
        if (cancelled) return;

        if (data.length > 0) {
          setFallbackSource("curated");
          setFallbackCards(data.slice(0, 12));
          return;
        }

        // 精选也无结果，尝试搜索社区提示词
        const result = await getCommPrompts(1, 12, "upvoteDifference", "desc", searchQuery);
        if (cancelled) return;
        const commuPrompts = Array.isArray(result) ? result[0] : [];
        setFallbackSource("community");
        setFallbackCards(commuPrompts);
      } catch {
        if (!cancelled) setFallbackCards([]);
      } finally {
        if (!cancelled) setIsFallbackLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filteredItems.length, searchQuery, currentLanguage]);

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
        if (userAuth?.data?.items) {
          const orderMap = new Map<string, number>();
          newOrder.forEach((it, i) => orderMap.set(`${it.type}_${it.source}_${it.id}`, i));
          const oldItems: any[] = userAuth.data.items;
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
        messageApi.error(<Translate id="message.orderSaveFailed">排列保存失败</Translate>);
      }
    },
    [spaceItems, filteredItems, filter, selectedTags, searchQuery, messageApi, userAuth, syncMySpaceState],
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
          // 转换成功后，从收藏中移除原提示词
          await confirmRemoveFavorite(data.id, !isDataCard);
        }
      } catch (error) {
        console.error("Failed to convert prompt:", error);
        messageApi.error(<Translate id="message.convertToPrivate.error">转换失败，请稍后重试</Translate>);
      }
    },
    [addUserPrompt, confirmRemoveFavorite, messageApi, i18n],
  );

  // 移除收藏
  const handleRemoveFavorite = useCallback(
    (id: number, isComm?: boolean) => {
      confirmRemoveFavorite(id, isComm);
    },
    [confirmRemoveFavorite],
  );

  // ============== 标签分配：save on dropdown close ==============
  // 心理模型：dropdown 是一次"编辑会话"，关闭即提交。
  // 点 tag = 纯本地 toggle，关闭 dropdown = 一次 API 提交（无变化跳过）。
  const spaceItemsRef = useRef(spaceItems);
  spaceItemsRef.current = spaceItems;
  const customTagsRef = useRef(customTags);
  customTagsRef.current = customTags;
  // 当前打开的 dropdown：itemId + 打开那一刻的 tag 状态（失败回滚 + diff 判断用）
  const dropdownEditRef = useRef<{ itemId: string; originalTags: string[] } | null>(null);

  // 浅比较两个 string[]（无序）
  const tagsEqual = (a: string[], b: string[]) => a.length === b.length && a.every((t) => b.includes(t));

  // 把 spaceItemsRef 当前状态构建成 itemTags payload
  const buildItemTags = useCallback((): Record<string, string[]> => {
    const itemTags: Record<string, string[]> = {};
    spaceItemsRef.current.forEach((item) => {
      if (item.customTags && item.customTags.length > 0) {
        itemTags[item.id] = item.customTags;
      }
    });
    return itemTags;
  }, []);

  // 提交当前编辑会话——dropdown 关闭、点"管理标签"、卸载时调用
  const saveTagAssignment = useCallback(async () => {
    const editing = dropdownEditRef.current;
    if (!editing) return;
    dropdownEditRef.current = null;

    const currentItem = spaceItemsRef.current.find((i) => i.id === editing.itemId);
    if (!currentItem) return;
    const currentTags = currentItem.customTags || [];

    // 无变化（开了 dropdown 但什么都没改）→ 跳过 API
    if (tagsEqual(currentTags, editing.originalTags)) return;

    try {
      const itemTagsPayload = buildItemTags();
      await updateCustomTags({ definitions: customTagsRef.current, itemTags: itemTagsPayload });
      // 同步 userAuth.data.items[i].tags（之前此路径漏写造成隐性 drift）：
      // spaceItems 的 composite id 跟 userAuth.items 的 (type, source, id) 一一对应，
      // 用同一个 itemTags map 重新拼 tags 字段。空 tags 时移除字段，与 /myspace 返回 shape 一致。
      if (userAuth?.data?.items) {
        const newItems = (userAuth.data.items as any[]).map((it) => {
          const compositeKey = `${it.type}_${it.source}_${it.id}`;
          const tags = itemTagsPayload[compositeKey];
          if (tags && tags.length > 0) return { ...it, tags };
          const { tags: _drop, ...rest } = it;
          return rest;
        });
        syncMySpaceState({ items: newItems });
      }
    } catch (error) {
      console.error("Failed to update item tags:", error);
      messageApi.error("标签更新失败");
      // 回滚到打开 dropdown 那一刻的 originalTags（中间的 toggle 全部撤销）
      setSpaceItems((items) => items.map((i) => (i.id === editing.itemId ? { ...i, customTags: editing.originalTags } : i)));
    }
  }, [buildItemTags, messageApi, userAuth, syncMySpaceState]);

  // 切换项目标签——纯本地 toggle，不发 API
  // functional updater 防 stale state（rapid click 安全）
  const handleToggleTag = useCallback((itemId: string, tagId: string) => {
    setSpaceItems((items) =>
      items.map((i) => {
        if (i.id !== itemId) return i;
        const currentTags = i.customTags || [];
        const newTags = currentTags.includes(tagId) ? currentTags.filter((t) => t !== tagId) : [...currentTags, tagId];
        return { ...i, customTags: newTags };
      }),
    );
  }, []);

  // 卸载兜底：用户在 dropdown 开着的时候 F5 / 路由跳走 → fire-and-forget 提交
  // 浏览器在 unload 期间通常会让 in-flight 请求继续完成；rare case 失败接受丢失（用户可重新 toggle）
  useEffect(() => {
    return () => {
      const editing = dropdownEditRef.current;
      if (!editing) return;
      dropdownEditRef.current = null;
      const currentItem = spaceItemsRef.current.find((i) => i.id === editing.itemId);
      if (!currentItem || tagsEqual(currentItem.customTags || [], editing.originalTags)) return;
      updateCustomTags({ definitions: customTagsRef.current, itemTags: buildItemTags() }).catch(() => {});
    };
  }, [buildItemTags]);

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
                              onToggleFavorite={(id, isComm) => (isFav ? confirmRemoveFavorite(id, isComm) : addFavorite(id, isComm))}
                              onOpenModal={onOpenModal}
                            />
                          </Col>
                        );
                      }
                      return (
                        <Col key={card.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                          <PromptCard type="data" data={card} copyCount={getWeight(card)} isLoggedIn={true} isFavorite={userAuth?.data?.favorites?.loves?.includes(card.id)} onToggleFavorite={(id, isComm) => { const loves = userAuth?.data?.favorites?.loves || []; if (loves.includes(id)) confirmRemoveFavorite(id, isComm); else addFavorite(id, isComm); }} onOpenModal={onOpenModal} />
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
