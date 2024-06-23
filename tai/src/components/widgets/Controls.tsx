"use client";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { Button } from "../inputs/Button";
export default function Controls() {
  const { connect, disconnect, readyState, messages } = useVoice();
  var userEmotions: any[] = []

  if (readyState === VoiceReadyState.OPEN) {
    return (
      <FontAwesomeIcon color={'black'} icon={faMicrophone} onClick={() => {
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
      }} />
    );
  }

  return (
    <Button text="So excited to learn! Let's get started!" onClick={() => {
      connect()
        .then(() => {
          /* handle success */
        })
        .catch(() => {
          /* handle error */
        });
    }}/>
  );
}