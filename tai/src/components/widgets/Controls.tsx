"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
export default function Controls() {
  const { connect, disconnect, readyState, messages } = useVoice();
  var userEmotions: any[] = []

  if (readyState === VoiceReadyState.OPEN) {
    return (
      <button
        onClick={() => {
          messages.map((msg, index) => {
            if (msg.type === "user_message") {
              userEmotions.push({
                emotionScores: msg.models.prosody?.scores,
                userMessage: msg.message.content
              });
            }
          })

          console.log(userEmotions)
          disconnect();
        }}
      >
        End Session
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        connect()
          .then(() => {
            /* handle success */
          })
          .catch(() => {
            /* handle error */
          });
      }}
    >
      Start Session
    </button>
  );
}