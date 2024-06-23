"use client";
import { useVoice } from "@humeai/voice-react";

export default function Messages() {
  const { messages } = useVoice();
  console.log(messages)

  return (
    <div className="flex flex-col flex-1 p-2.5 overflow-y-scroll">
      {messages.map((msg, index) => {
        if (msg.type === "user_message" || msg.type === "assistant_message") {
          return (
            <div key={msg.type + index} className={`mb-2.5 p-2.5 rounded-md w-3/5 ${msg.type.includes("user") ? "self-end bg-slate-200" : "self-start bg-slate-400"}`}>
              {msg.message.content}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
