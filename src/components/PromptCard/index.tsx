import React from "react";
import { UserCard } from "./UserCard";
import { FavoriteCard } from "./FavoriteCard";
import { DataCard } from "./DataCard";
import { CommunityCard } from "./CommunityCard";
import { PromptCardProps } from "./types";

const PromptCard: React.FC<PromptCardProps> = ({ type, data, onOpenModal, ...props }) => {
  switch (type) {
    case "user":
      return <UserCard data={data} onOpenModal={onOpenModal} {...props} />;
    case "favorite":
      return <FavoriteCard data={data} onOpenModal={onOpenModal} {...props} />;
    case "data":
      return <DataCard data={data} onOpenModal={onOpenModal} {...props} />;
    case "community":
      return <CommunityCard data={data} onOpenModal={onOpenModal} {...props} />;
    default:
      return null;
  }
};

export default React.memo(PromptCard);
