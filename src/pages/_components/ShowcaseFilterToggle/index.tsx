/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import { Switch, ConfigProvider } from "antd";

import { prepareUserState } from "../../index";

export type Operator = "OR" | "AND";

export const OperatorQueryKey = "operator";

export function readOperator(search: string): Operator {
  return (new URLSearchParams(search).get(OperatorQueryKey) ?? "OR") as Operator;
}

export default function ShowcaseFilterToggle(): React.ReactElement {
  const location = useLocation();
  const history = useHistory();
  const [operator, setOperator] = useState(false);

  useEffect(() => {
    setOperator(readOperator(location.search) === "AND");
  }, [location]);

  const toggleOperator = useCallback(
    (checked: boolean) => {
      setOperator(checked);
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete(OperatorQueryKey);
      if (checked) {
        searchParams.append(OperatorQueryKey, "AND");
      }
      history.push({
        ...location,
        search: searchParams.toString(),
        state: prepareUserState(),
      });
    },
    [location, history]
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            handleSize: 14,
            trackHeight: 20,
            trackMinWidth: 45,
            colorPrimary: "var(--ifm-color-primary)",
            colorPrimaryHover: "var(--ifm-color-primary-dark)",
          },
        },
      }}>
      <Switch checked={operator} onChange={toggleOperator} checkedChildren="AND" unCheckedChildren="OR" />
    </ConfigProvider>
  );
}
