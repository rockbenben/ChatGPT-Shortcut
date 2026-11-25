import React from "react";
import { CloseCircleFilled } from "@ant-design/icons";
import { translate } from "@docusaurus/Translate";

export function InputClearIcon() {
  return <CloseCircleFilled aria-label={translate({ id: "placeholder.clear", message: "清空" })} />;
}
