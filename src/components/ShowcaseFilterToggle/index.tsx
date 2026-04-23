/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import { Segmented, Tooltip } from "antd";
import Translate from "@docusaurus/Translate";

import { prepareUserState } from "@site/src/components/SearchBar/index";

export type Operator = "OR" | "AND";

const OperatorQueryKey = "operator";

function readOperator(search: string): Operator {
  return (new URLSearchParams(search).get(OperatorQueryKey) ?? "OR") as Operator;
}

export default function ShowcaseFilterToggle(): React.ReactElement {
  const location = useLocation();
  const history = useHistory();
  const [operator, setOperator] = useState<Operator>("OR");

  useEffect(() => {
    setOperator(readOperator(location.search));
  }, [location]);

  const setOperatorValue = useCallback(
    (value: Operator) => {
      setOperator(value);
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete(OperatorQueryKey);
      if (value === "AND") {
        searchParams.append(OperatorQueryKey, "AND");
      }
      history.push({
        ...location,
        search: searchParams.toString(),
        state: prepareUserState(),
      });
    },
    [location, history],
  );

  return (
    <Segmented<Operator>
      value={operator}
      onChange={setOperatorValue}
      options={[
        {
          value: "OR",
          label: (
            <Tooltip title={<Translate id="filter.operator.any.tip">命中任一 tag 即显示</Translate>}>
              <span>OR</span>
            </Tooltip>
          ),
        },
        {
          value: "AND",
          label: (
            <Tooltip title={<Translate id="filter.operator.all.tip">必须同时命中所有 tag</Translate>}>
              <span>AND</span>
            </Tooltip>
          ),
        },
      ]}
      size="small"
    />
  );
}
