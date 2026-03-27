"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import type { FC, FormEvent, KeyboardEvent } from "react";
import {
  type IStep,
  useChatData,
  useChatInteract,
  useChatMessages,
  useChatSession,
} from "@/lib/chain-lit-react-client";
import { Button } from "@/components/ui/button";

const userEnv: Record<string, string> = {};

const getMessageText = (message: IStep) => {
  const msg = message as IStep & { content?: string };
  return msg.output || msg.input || msg.content || "";
};

type ChatBubble = {
  id: string;
  role: "user" | "assistant";
  text: string;
  streaming?: boolean;
};

const collectConversationMessages = (messages: IStep[]): ChatBubble[] => {
  const conversation: ChatBubble[] = [];

  const walk = (items: IStep[]) => {
    for (const item of items) {
      if (item.type === "user_message" || item.type === "assistant_message") {
        conversation.push({
          id: item.id,
          role: item.type === "user_message" ? "user" : "assistant",
          text: getMessageText(item),
          streaming: item.streaming,
        });
      }

      if (item.steps?.length) {
        walk(item.steps);
      }
    }
  };

  walk(messages);
  return conversation;
};

const LoadingDots: FC = () => {
  return (
    <span className="inline-flex items-center gap-1 align-middle" aria-label="AI 正在思考中">
      <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:0ms]" />
      <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:120ms]" />
      <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:240ms]" />
    </span>
  );
};

export const ChainLitList: FC = () => {
  const [input, setInput] = useState("");
  const { connect, disconnect, session } = useChatSession();
  const { sendMessage } = useChatInteract();
  const { messages, firstInteraction, threadId } = useChatMessages();
  const { connected, loading, disabled } = useChatData();

  console.log(messages);


  const handleConnect = useCallback(() => {
    connect({ userEnv });
  }, [connect]);

  useEffect(() => {
    handleConnect();
    return () => {
      disconnect();
    };
  }, []);

  const canSend = useMemo(() => {
    return input.trim().length > 0 && !disabled;
  }, [disabled, input]);

  const handleSubmit = useCallback(
    (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      const value = input.trim();
      if (!value || !canSend) return;

      sendMessage({
        name: "You",
        type: "user_message",
        output: value,
      });
      setInput("");
    },
    [canSend, input, sendMessage]
  );

  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const conversation = useMemo(() => collectConversationMessages(messages), [messages]);
  const isLastMessageFromUser =
    conversation.length > 0 && conversation[conversation.length - 1]?.role === "user";

  return (
    <Fragment>
      <div className="mx-auto flex h-[calc(100vh-3rem)] w-full max-w-4xl flex-col gap-4 py-6">
        <div className="flex items-center justify-between rounded-md border p-3">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Chainlit Chat</h1>
            <p className="text-sm text-muted-foreground">
              状态：{connected ? "已连接" : "未连接"}
              {session?.error ? "（连接异常）" : ""}
              {loading ? " · 生成中..." : ""}
            </p>
            <p className="text-xs text-muted-foreground">
              threadId: {threadId ?? "-"} | firstInteraction:{" "}
              {firstInteraction ?? "-"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleConnect}>
              重新连接
            </Button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto rounded-md border p-4">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground">暂无消息，输入内容开始聊天。</p>
          ) : (
            <div className="space-y-3">
              {conversation.map((message) => {
                const isUser = message.role === "user";
                const showStreamingState =
                  !isUser && (Boolean(message.streaming) || (loading && message.id === conversation[conversation.length - 1]?.id));

                return (
                  <div
                    key={message.id}
                    className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        isUser
                          ? "bg-primary text-primary-foreground"
                          : "border bg-muted/40 text-foreground"
                      }`}
                    >
                      {message.text ? (
                        <p className="whitespace-pre-wrap wrap-break-word">{message.text}</p>
                      ) : (
                        <p className="text-muted-foreground">...</p>
                      )}
                      {showStreamingState ? (
                        <div className="mt-2 text-muted-foreground">
                          <LoadingDots />
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              {loading && isLastMessageFromUser ? (
                <div className="flex w-full justify-start">
                  <div className="max-w-[80%] rounded-2xl border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                    <LoadingDots />
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <textarea
            className="min-h-24 w-full resize-y rounded-md border bg-background p-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={
              connected
                ? "输入消息，Enter 发送，Shift+Enter 换行"
                : "等待连接中..."
            }
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={disabled}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!canSend}>
              发送
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};