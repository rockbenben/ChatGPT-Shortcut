import React, { useContext, useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import { Spin, Empty, App } from "antd";
import { BasePromptCard } from "@site/src/pages/_components/PromptCard/Base";
import PromptCard from "@site/src/pages/_components/PromptCard";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import styles from "@site/src/pages/_components/PromptCard/styles.module.css";
import pageStyles from "@site/src/pages/styles.module.css";
import isEqual from "lodash/isEqual";

import { getPrompts, updatePromptsOrder, updateUserInfoCache } from "@site/src/api";
import { AuthContext } from "../AuthContext";
import { useUserPrompt } from "@site/src/hooks/useUserPrompt";
import EditPromptModal from "./modal/EditPromptModal";

interface UserPromptsProps {
  filteredCommus?: any[];
  isFiltered?: boolean;
  onOpenModal?: (data: any) => void;
}

function UserPromptsPage({ filteredCommus = [], isFiltered = false, onOpenModal }: UserPromptsProps) {
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
      updateUserInfoCache("userprompts", objectsArray);
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
              <li style={{ listStyle: "none" }}>
                <BasePromptCard>
                  <div className={styles.cardBodyHeight} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
                    <Empty description={<Translate id="message.noPrompts">尚未提交任何提示词，请添加提示词。</Translate>} />
                  </div>
                </BasePromptCard>
              </li>
            ) : (
              <SortableContext items={userprompts.map((item) => item.id)}>
                {userprompts.map((UserPrompt) => (
                  <PromptCard key={UserPrompt.id} type="user" data={UserPrompt} isFiltered={isFiltered} onDelete={handleDeletePrompt} onEdit={handleEditPrompt} onOpenModal={onOpenModal} />
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
