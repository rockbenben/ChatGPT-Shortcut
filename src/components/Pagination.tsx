import React from "react";
import { ConfigProvider, Pagination as AntdPagination } from "antd";
import type { PaginationProps } from "antd";
import { useAntdLocale } from "@site/src/theme/useAntdLocale";

export function Pagination(props: Omit<PaginationProps, "itemRender">) {
  const antdLocale = useAntdLocale();
  const labels = { ...antdLocale?.Pagination, ...props.locale };

  return (
    <ConfigProvider locale={antdLocale}>
      <AntdPagination
        {...props}
        itemRender={(_, type, item) => {
          if (!React.isValidElement<React.AriaAttributes>(item)) return item;
          if (type === "prev") return React.cloneElement(item, { "aria-label": labels.prev_page ?? "Previous page" });
          if (type === "next") return React.cloneElement(item, { "aria-label": labels.next_page ?? "Next page" });
          return item;
        }}
      />
    </ConfigProvider>
  );
}
