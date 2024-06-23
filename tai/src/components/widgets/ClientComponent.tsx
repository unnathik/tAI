// ./components/ClientComponent.tsx
"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Controls";
import Controls from "./Messages";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  return (
    <VoiceProvider auth={{ type: "apiKey", value: "SX2EKyfkWOzEi7IUFQGrjne72UvWGWxLIurjITFW7w3AaZlM" }}>
      <Messages />
      <Controls />
    </VoiceProvider>
  );
}