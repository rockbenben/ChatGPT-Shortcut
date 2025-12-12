import { createContext, useContext } from "react";

export type ViewMode = "collection" | "explore";

export const ViewModeContext = createContext<{
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
}>({
  viewMode: "collection",
  setViewMode: () => {},
});

export const useViewMode = () => useContext(ViewModeContext);
