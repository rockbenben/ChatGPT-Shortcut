import React from "react";
import { UserCard } from "./UserCard";
import { FavoriteCard } from "./FavoriteCard";
import { DataCard } from "./DataCard";
import { CommunityCard } from "./CommunityCard";
import { PromptCardProps } from "./types";

const PromptCard: React.FC<PromptCardProps> = ({ type, data, onOpenModal, typeBadge, extraActions, ...props }) => {
  const renderCard = () => {
    switch (type) {
      case "user":
        return <UserCard data={data} onOpenModal={onOpenModal} extraActions={extraActions} {...props} />;
      case "favorite":
        return <FavoriteCard data={data} onOpenModal={onOpenModal} extraActions={extraActions} {...props} />;
      case "data":
        return <DataCard data={data} onOpenModal={onOpenModal} {...props} />;
      case "community":
        return <CommunityCard data={data} onOpenModal={onOpenModal} {...props} />;
      default:
        return null;
    }
  };

  // If typeBadge is provided, wrap the card in a relative container
  if (typeBadge) {
    return (
      <div style={{ position: "relative", height: "100%" }}>
        {typeBadge}
        {renderCard()}
      </div>
    );
  }

  return renderCard();
};

export default React.memo(PromptCard);
