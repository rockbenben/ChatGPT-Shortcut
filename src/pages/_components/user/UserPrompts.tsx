import React, { useContext, useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { Button, Spin, Tooltip, Tag, App, Space, Empty } from "antd";
import { CopyOutlined, DeleteOutlined, EditOutlined, CheckOutlined, DownOutlined, LockOutlined } from "@ant-design/icons";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "@site/src/pages/_components/ShowcaseCard/styles.module.css";
import pageStyles from "@site/src/pages/styles.module.css";
import { MAX_LENGTH, truncate } from "@site/src/utils/formatters";
import isEqual from "lodash/isEqual";

import { getPrompts, updatePromptsOrder, updateLocalStorageCache } from "@site/src/api";
import { AuthContext } from "../AuthContext";
import { ShowcaseRemark } from "@site/src/pages/_components/ShowcaseCard/ShowcaseRemark";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import EditPromptModal from "./modal/EditPromptModal";

// SortableItem component
const SortablePromptItem = ({ UserPrompt, isFiltered, handleDeletePrompt, handleEditPrompt }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: UserPrompt.id });
  const [showFullContent, setShowFullContent] = useState(false);
  const [paragraphText, setParagraphText] = useState(UserPrompt.description);
  const { copied, copyText } = useCopyToClipboard();

  const toggleContentDisplay = () => {
    setShowFullContent(!showFullContent);
  };

  const handleParagraphClick = () => {
    if (UserPrompt.notes) {
      setParagraphText(paragraphText === UserPrompt.description ? UserPrompt.notes : UserPrompt.description);
    }
  };

  const displayText = paragraphText || UserPrompt.description;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isFiltered ? "default" : "grab",
  };

  return (
    <li ref={setNodeRef} className={clsx("card", styles.showcaseCard)} style={style}>
      <div
        className={clsx("card__body")}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}>
        <div>
          <div className={clsx(styles.showcaseCardHeader)}>
            <div className={`${styles.showcaseCardTitle} ${styles.shortEllipsisMy}`} {...attributes} {...(isFiltered ? {} : listeners)}>
              <span className={styles.showcaseCardLink}>{UserPrompt.title} </span>
              {UserPrompt.upvoteDifference > 0 && <Tag color="green">+{UserPrompt.upvoteDifference}</Tag>}
              {UserPrompt.share === false && <Tag color="blue" icon={<LockOutlined />} />}
            </div>
            <Space.Compact>
              <Tooltip title={<Translate id="action.copy">复制</Translate>}>
                <Button icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={() => copyText(UserPrompt.description)} />
              </Tooltip>
              <Tooltip title={<Translate id="action.edit">修改</Translate>}>
                <Button icon={<EditOutlined />} onClick={() => handleEditPrompt(UserPrompt)} />
              </Tooltip>
              <Tooltip title={<Translate id="action.delete">删除</Translate>}>
                <Button icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />} onClick={() => handleDeletePrompt(UserPrompt.id)} />
              </Tooltip>
            </Space.Compact>
          </div>
          {UserPrompt.remark && <ShowcaseRemark remark={UserPrompt.remark} style={{ maxHeight: 68 }} {...attributes} {...(isFiltered ? {} : listeners)} />}
          <div className={styles.descriptionWrapper}>
            <p onClick={handleParagraphClick} className={`${styles.showcaseCardBody} ${UserPrompt.notes ? styles.clickable : styles.nonClickable}`}>
              {showFullContent ? displayText : truncate(displayText)}
            </p>
            {!showFullContent && displayText.length > MAX_LENGTH && (
              <div className={styles.gradientOverlay}>
                <div className={styles.loadMoreBtn} onClick={toggleContentDisplay}>
                  <DownOutlined className={styles.downIcon} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

function UserPromptsPage({ filteredCommus = [], isFiltered = false }) {
  const { userAuth } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();
  const [userprompts, setUserPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);

  const { updatePrompt, confirmRemovePrompt, loading: hookLoading } = useUserPrompt();

  // Configure dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!userAuth?.data) return;
    let isMounted = true;

    const fetchPrompts = async () => {
      setLoading(true);
      try {
        if (isFiltered) {
          setUserPrompts(filteredCommus);
        } else {
          const myPrompts = userAuth.data?.userprompts || [];
          const myPromptsData = await getPrompts("userprompts", myPrompts);
          if (isMounted) {
            setUserPrompts(myPromptsData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch prompts:", error);
        if (isMounted) {
          messageApi.error(<Translate id="message.fetchError">获取提示词失败，请稍后重试</Translate>);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchPrompts();
    return () => {
      isMounted = false;
    };
  }, [userAuth, isFiltered, filteredCommus, messageApi]);

  const handleEditPrompt = useCallback((UserPrompt) => {
    setEditingPrompt(UserPrompt);
    setOpen(true);
  }, []);

  const onUpdateprompt = useCallback(
    async (values) => {
      if (!editingPrompt) return;
      const success = await updatePrompt(editingPrompt.id, values);
      if (success) {
        setOpen(false);
        setEditingPrompt(null);
      }
    },
    [editingPrompt, updatePrompt]
  );

  const handleDeletePrompt = useCallback(
    (promptId) => {
      confirmRemovePrompt(promptId);
    },
    [confirmRemovePrompt]
  );

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setHasDragged(true);
      setUserPrompts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  useEffect(() => {
    if (hasDragged && userprompts.length > 0) {
      const ids = userprompts.map((item) => item.id);
      const objectsArray = ids.map((id) => ({ id }));
      updateLocalStorageCache("userprompts", objectsArray);
      updatePromptsOrder(ids);
      setHasDragged(false);
    }
  }, [userprompts, hasDragged]);

  if (!userAuth?.data) {
    return <Spin />;
  }

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
          <Spin />
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <ul className={clsx("clean-list", pageStyles.showcaseList)}>
            {!userprompts || userprompts.length === 0 ? (
              <li className={clsx("card", styles.showcaseCard)}>
                <div className={clsx("card__body", styles.cardBodyHeight)} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
                  <Empty description={<Translate id="message.noPrompts">尚未提交任何提示词，请添加提示词。</Translate>} />
                </div>
              </li>
            ) : (
              <SortableContext items={userprompts.map((item) => item.id)}>
                {userprompts.map((UserPrompt) => (
                  <SortablePromptItem key={UserPrompt.id} UserPrompt={UserPrompt} isFiltered={isFiltered} handleDeletePrompt={handleDeletePrompt} handleEditPrompt={handleEditPrompt} />
                ))}
              </SortableContext>
            )}
          </ul>
        </DndContext>
      )}

      <EditPromptModal open={open} setOpen={setOpen} onFinish={onUpdateprompt} loading={hookLoading} initialValues={editingPrompt} />
    </>
  );
}

function areEqual(prevProps, nextProps) {
  return prevProps.isFiltered === nextProps.isFiltered && isEqual(prevProps.filteredCommus, nextProps.filteredCommus);
}

export default React.memo(UserPromptsPage, areEqual);
