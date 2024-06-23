"use client";
import { useVoice } from "@humeai/voice-react";

export default function Messages() {
  const { messages } = useVoice();
  console.log(messages)

  return (
    <div className="chat-messages">
      {messages.map((msg, index) => {
        if (msg.type === "user_message" || msg.type === "assistant_message") {
          return (
            <div key={msg.type + index} className={`chat-message ${msg.type.includes("user") ? "user" : "bot"}`}>
              {msg.message.content}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
