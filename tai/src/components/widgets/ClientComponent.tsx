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
    <VoiceProvider auth={{ type: "apiKey", value: "gvHXvjuGGa4tgeY4wFkinI1XUSVLKftGlPiyYsWkGX2aRTGq" }}>
      <Messages />
      <Controls />
    </VoiceProvider>
  );
}