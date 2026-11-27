import React, { useLayoutEffect } from "react";
import { message, Modal } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import type { HookAPI } from "antd/es/modal/useModal";

export interface FeedbackBridgeApi {
  message: MessageInstance;
  modal: HookAPI;
}

interface AntdFeedbackBridgeProps {
  onReady: (api: FeedbackBridgeApi) => void;
}

/**
 * 懒加载的 antd feedback 宿主：只挂载 message + Modal hook，不引入 notification 与 App。
 * 首次有 toast 或 confirm 需求时才加载，避免把 Modal/ConfirmDialog/Portal 等打进全站 main.js。
 */
const AntdFeedbackBridge: React.FC<AntdFeedbackBridgeProps> = ({ onReady }) => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modalApi, modalContextHolder] = Modal.useModal();

  useLayoutEffect(() => {
    onReady({ message: messageApi, modal: modalApi });
  }, [messageApi, modalApi, onReady]);

  return (
    <>
      {messageContextHolder}
      {modalContextHolder}
    </>
  );
};

export default AntdFeedbackBridge;
