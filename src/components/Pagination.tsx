import React, { useContext } from "react";
import { ConfigProvider, Pagination as AntdPagination } from "antd";
import type { PaginationProps } from "antd";

export function Pagination(props: Omit<PaginationProps, "itemRender">) {
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const labels = { ...locale?.Pagination, ...props.locale };

  return (
    <AntdPagination
      {...props}
      itemRender={(_, type, item) => {
        if (!React.isValidElement<React.AriaAttributes>(item)) return item;
        if (type === "prev") return React.cloneElement(item, { "aria-label": labels.prev_page ?? "Previous page" });
        if (type === "next") return React.cloneElement(item, { "aria-label": labels.next_page ?? "Next page" });
        return item;
      }}
    />
  );
}
