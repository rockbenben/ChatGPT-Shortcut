import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import type { MessageInstance } from "antd/es/message/interface";
import type { HookAPI } from "antd/es/modal/useModal";
import { retryImport } from "@site/src/utils/lazyRetry";
import type { FeedbackBridgeApi } from "./AntdFeedbackBridge";

type MessageMethod = "success" | "error" | "warning" | "info" | "loading" | "open" | "destroy";

export interface AppFeedbackValue {
  message: Pick<MessageInstance, MessageMethod>;
  modal: { confirm: (key: string, config: Parameters<HookAPI["confirm"]>[0]) => void };
}

type PendingCall = (api: FeedbackBridgeApi) => void;

const noopHandle = (() => {}) as any;

const AppFeedbackContext = createContext<AppFeedbackValue | null>(null);

export const AppFeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [Bridge, setBridge] = useState<typeof import("./AntdFeedbackBridge").default | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const bridgeRequestedRef = useRef(false);
  const liveApiRef = useRef<FeedbackBridgeApi | null>(null);
  const pendingQueueRef = useRef<PendingCall[]>([]);
  const confirmationKeysRef = useRef(new Set<string>());

  const enqueueOrRun = useCallback((fn: PendingCall) => {
    if (liveApiRef.current) {
      return fn(liveApiRef.current);
    }
    pendingQueueRef.current.push(fn);
    if (!bridgeRequestedRef.current) {
      bridgeRequestedRef.current = true;
      void retryImport(() => import("./AntdFeedbackBridge")).then(
        ({ default: FeedbackBridge }) => setBridge(() => FeedbackBridge),
        (error) => {
          console.error("Failed to load feedback:", error);
          pendingQueueRef.current = [];
          confirmationKeysRef.current.clear();
          bridgeRequestedRef.current = false;
          setLoadFailed(true);
        },
      );
    }
    return noopHandle;
  }, []);

  const handleReady = useCallback((api: FeedbackBridgeApi) => {
    liveApiRef.current = api;
    setLoadFailed(false);
    const queue = pendingQueueRef.current;
    if (queue.length > 0) {
      pendingQueueRef.current = [];
      for (const task of queue) {
        task(api);
      }
    }
  }, []);

  const value = useMemo<AppFeedbackValue>(() => {
    const callMessage = (method: MessageMethod) => (...args: any[]) =>
      enqueueOrRun((api) => (api.message[method] as (...a: any[]) => any)(...args));

    return {
      message: {
        success: callMessage("success"),
        error: callMessage("error"),
        warning: callMessage("warning"),
        info: callMessage("info"),
        loading: callMessage("loading"),
        open: callMessage("open"),
        destroy: callMessage("destroy"),
      },
      modal: {
        confirm: (key, config) => {
          // 同一操作在等待加载和弹窗打开期间只接受一次。
          const keys = confirmationKeysRef.current;
          if (keys.has(key)) return;
          keys.add(key);
          enqueueOrRun((api) => api.modal.confirm({
            ...config,
            afterClose: () => {
              keys.delete(key);
              config.afterClose?.();
            },
          }));
        },
      },
    };
  }, [enqueueOrRun]);

  return (
    <AppFeedbackContext.Provider value={value}>
      <div className="app-root">{children}</div>
      {Bridge && <Bridge onReady={handleReady} />}
      {loadFailed && (
        <div
          role="alert"
          className="alert alert--warning"
          style={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            width: "max-content",
            maxWidth: "calc(100% - 32px)",
            transform: "translateX(-50%)",
            zIndex: 1100,
          }}
          dir="auto">
          <button
            type="button"
            className="clean-btn close"
            aria-label={translate({ id: "action.close", message: "关闭" })}
            onClick={() => setLoadFailed(false)}>
            ×
          </button>
          <Translate id="message.loadFailed">加载数据失败，请稍后重试</Translate>
        </div>
      )}
    </AppFeedbackContext.Provider>
  );
};

export function useAppFeedback(): AppFeedbackValue {
  const ctx = useContext(AppFeedbackContext);
  if (!ctx) {
    throw new Error("useAppFeedback must be used within AppFeedbackProvider");
  }
  return ctx;
}
