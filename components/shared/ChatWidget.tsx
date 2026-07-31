"use client";

import ChatMessageContent from "@/components/shared/ChatMessageContent";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, Send, X } from "lucide-react";

type ChatRole = "user" | "assistant";
type ChatMessage = { role: ChatRole; content: string };

const WELCOME =
  "Hi — I'm the SFPL assistant. Ask about SFPL CONNECT, our fire-safety services, portal, or policies.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open, loading]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const message = input.trim();
    if (!message || loading) return;

    setError(null);
    setInput("");
    const history = messages
      .filter((item) => item.content !== WELCOME)
      .slice(-4);
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          typeof payload.error === "string"
            ? payload.error
            : "Unable to get an answer right now."
        );
      }
      const answer =
        typeof payload.answer === "string" ? payload.answer.trim() : "";
      if (!answer) throw new Error("Empty answer from assistant.");
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="pointer-events-auto flex h-[min(32rem,70vh)] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <Bot className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">SFPL Assistant</p>
                <p className="text-xs text-primary-foreground/80">
                  Answers from SFPL docs
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto bg-[linear-gradient(180deg,#fff_0%,#fafafa_100%)] px-3 py-3"
          >
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    item.role === "user"
                      ? "bg-primary text-primary-foreground whitespace-pre-wrap"
                      : "border border-border bg-white text-foreground"
                  }`}
                >
                  {item.role === "user" ? (
                    item.content
                  ) : (
                    <ChatMessageContent content={item.content} />
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <p className="text-xs text-muted-foreground">Thinking…</p>
            )}
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          <form
            onSubmit={onSubmit}
            className="flex items-end gap-2 border-t border-border bg-white p-3"
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={2}
              maxLength={750}
              placeholder="Ask about SFPL CONNECT…"
              className="max-h-24 min-h-[2.75rem] flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? "Close chat" : "Open SFPL AI"}
        onClick={() => setOpen((value) => !value)}
        className={`pointer-events-auto inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-[1.03] ${
          open ? "h-14 w-14" : "h-12 gap-1.5 px-3.5"
        }`}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <Bot className="h-5 w-5 shrink-0" />
            <span className="text-[11px] font-semibold leading-none tracking-wide">
              SFPL AI
            </span>
          </>
        )}
      </button>
    </div>
  );
}
