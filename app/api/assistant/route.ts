import { NextRequest, NextResponse } from "next/server";
import env from "@/config/env";

type HistoryItem = { role: "user" | "assistant"; content: string };

function getClientId(request: NextRequest): string {
  const existing = request.cookies.get("sfpl_chat_client")?.value;
  if (existing && /^[a-f0-9]{64}$/.test(existing)) return existing;
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: NextRequest) {
  if (!env.webChatSecret) {
    return NextResponse.json(
      { error: "Chat is not configured." },
      { status: 503 }
    );
  }

  let body: { message?: string; history?: HistoryItem[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 750) {
    return NextResponse.json(
      { error: "Message must be between 1 and 750 characters." },
      { status: 400 }
    );
  }

  const history = Array.isArray(body.history)
    ? body.history
        .filter(
          (item): item is HistoryItem =>
            !!item &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string"
        )
        .slice(-4)
        .map((item) => ({
          role: item.role,
          content: item.content.trim().slice(0, 350),
        }))
    : [];

  const clientId = getClientId(request);
  const upstream = await fetch(`${env.serverProxyUrl}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-sfpl-chat-secret": env.webChatSecret,
      "x-sfpl-chat-client": clientId,
    },
    body: JSON.stringify({ message, history }),
  });

  const payload = await upstream.json().catch(() => ({}));
  if (!upstream.ok) {
    return NextResponse.json(
      {
        error:
          payload?.message ||
          payload?.error ||
          "Unable to get an answer right now.",
      },
      { status: upstream.status }
    );
  }

  const answer =
    typeof payload?.data?.answer === "string" ? payload.data.answer : null;
  if (!answer) {
    return NextResponse.json(
      { error: "Empty answer from chat service." },
      { status: 502 }
    );
  }

  const response = NextResponse.json({ answer });
  if (!request.cookies.get("sfpl_chat_client")) {
    response.cookies.set("sfpl_chat_client", clientId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return response;
}
