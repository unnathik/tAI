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
    <VoiceProvider auth={{ type: "apiKey", value: "lOJAfmzwXjazWVwGA5fsjulJjjg5Fy8Cb8di5KulEN2utaex" }}>
      <Messages />
      <Controls />
    </VoiceProvider>
  );
}