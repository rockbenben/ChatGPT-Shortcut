import React, { Suspense, createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { MessageInstance } from "antd/es/message/interface";
import type { HookAPI } from "antd/es/modal/useModal";
import { lazyWithRetry } from "@site/src/utils/lazyRetry";
import type { FeedbackBridgeApi } from "./AntdFeedbackBridge";

const AntdFeedbackBridge = lazyWithRetry(() => import("./AntdFeedbackBridge"));

type MessageMethod = "success" | "error" | "warning" | "info" | "loading" | "open" | "destroy";

export interface AppFeedbackValue {
  message: Pick<MessageInstance, MessageMethod>;
  modal: Pick<HookAPI, "confirm">;
}

type PendingCall = (api: FeedbackBridgeApi) => void;

const noopHandle = (() => {}) as any;

const AppFeedbackContext = createContext<AppFeedbackValue | null>(null);

export const AppFeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activated, setActivated] = useState(false);
  const liveApiRef = useRef<FeedbackBridgeApi | null>(null);
  const pendingQueueRef = useRef<PendingCall[]>([]);

  const enqueueOrRun = useCallback((fn: PendingCall) => {
    if (liveApiRef.current) {
      return fn(liveApiRef.current);
    }
    pendingQueueRef.current.push(fn);
    setActivated(true);
    return noopHandle;
  }, []);

  const handleReady = useCallback((api: FeedbackBridgeApi) => {
    liveApiRef.current = api;
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
        confirm: (...args: Parameters<HookAPI["confirm"]>) =>
          enqueueOrRun((api) => api.modal.confirm(...args)),
      },
    };
  }, [enqueueOrRun]);

  return (
    <AppFeedbackContext.Provider value={value}>
      <div className="app-root">{children}</div>
      {activated && (
        <Suspense fallback={null}>
          <AntdFeedbackBridge onReady={handleReady} />
        </Suspense>
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
