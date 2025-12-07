import React, { useContext, useState, useEffect, useCallback } from "react";
import Translate from "@docusaurus/Translate";
import { Empty, App, Row, Col } from "antd";
import { BasePromptCard } from "@site/src/pages/_components/PromptCard/Base";
import PromptCard from "@site/src/pages/_components/PromptCard";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import styles from "@site/src/pages/_components/PromptCard/styles.module.css";
import isEqual from "lodash/isEqual";
import { getWeight } from "@site/src/utils/formatters";

import { getPrompts, updateFavoritesOrder, updateUserInfoCache } from "@site/src/api";
import { AuthContext } from "../AuthContext";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { PromptCardSkeleton } from "@site/src/pages/_components/PromptCardSkeleton";

interface UserFavoriteProps {
  filteredCommus?: any[];
  filteredCards?: any[];
  isFiltered?: boolean;
  isDescription?: boolean;
  onOpenModal?: (data: any) => void;
}

function UserFavoritePage({ filteredCommus = [], filteredCards = [], isFiltered = false, isDescription = true, onOpenModal }: UserFavoriteProps) {
  const { userAuth } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const { confirmRemoveFavorite } = useFavorite();

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

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        if (isFiltered) {
          setFavoriteItems([...filteredCommus, ...filteredCards]);
        } else {
          const loves = userAuth.data?.favorites?.loves || [];
          const commLoves = userAuth.data?.favorites?.commLoves || [];

          const [cardsData, commusData] = await Promise.all([getPrompts("cards", loves), getPrompts("commus", commLoves)]);

          if (isMounted) {
            setFavoriteItems([...commusData, ...cardsData]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
        if (isMounted) {
          messageApi.error(<Translate id="message.fetchError">获取收藏失败，请稍后重试</Translate>);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFavorites();

    return () => {
      isMounted = false;
    };
  }, [userAuth, isFiltered, filteredCommus, filteredCards, messageApi]);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setHasDragged(true);
      setFavoriteItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  useEffect(() => {
    if (hasDragged && favoriteItems.length > 0) {
      const ids = favoriteItems.map((item) => item.id);
      const objectsArray = ids.map((id) => ({ id }));
      updateUserInfoCache("favorites", objectsArray);
      updateFavoritesOrder("loves", ids);
      setHasDragged(false);
    }
  }, [favoriteItems, hasDragged]);

  const handleRemoveFavorite = useCallback(
    (id, isComm) => {
      confirmRemoveFavorite(id, isComm);
    },
    [confirmRemoveFavorite]
  );

  if (!userAuth?.data) {
    return <PromptCardSkeleton count={6} />;
  }

  return (
    <>
      {loading ? (
        <PromptCardSkeleton count={6} />
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <Row gutter={[16, 16]}>
            {!favoriteItems || favoriteItems.length === 0 ? (
              <Col xs={24} sm={24} md={24} lg={24}>
                <BasePromptCard>
                  <div className={styles.cardBodyHeight} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
                    <Empty description={<Translate id="message.noFavorites">尚未收藏任何提示词，请添加收藏。</Translate>} />
                  </div>
                </BasePromptCard>
              </Col>
            ) : (
              <SortableContext items={favoriteItems.map((item) => item.id)}>
                {favoriteItems.map((item) => (
                  <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                    <PromptCard
                      type="favorite"
                      data={item}
                      isFiltered={isFiltered}
                      isDescription={isDescription}
                      copyCount={getWeight(item)}
                      onRemoveFavorite={handleRemoveFavorite}
                      onOpenModal={onOpenModal}
                    />
                  </Col>
                ))}
              </SortableContext>
            )}
          </Row>
        </DndContext>
      )}
    </>
  );
}

function areEqual(prevProps, nextProps) {
  return (
    prevProps.isFiltered === nextProps.isFiltered &&
    prevProps.isDescription === nextProps.isDescription &&
    isEqual(prevProps.filteredCommus, nextProps.filteredCommus) &&
    isEqual(prevProps.filteredCards, nextProps.filteredCards)
  );
}

export default React.memo(UserFavoritePage, areEqual);
