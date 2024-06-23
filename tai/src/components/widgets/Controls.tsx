"use client";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { Button } from "../inputs/Button";
import OpenAI from "openai";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/app/firebase";

type ControlsProps = {
  topic: string;
}

export default function Controls({ topic }: ControlsProps) {
  const { connect, disconnect, readyState, messages } = useVoice();
  var userMessages: any[] = []


  const openai = new OpenAI({
    apiKey: "",
    dangerouslyAllowBrowser: true 
  });


  const gptSummary = async (userMessages) => {
    console.log("reached 1")
    console.log(topic)

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You will be provided with a series of messages that were sent back and forth between a user and an AI assistant built for teaching. Your task is to generate a summary of the conversation, highlighting where students struggled and where they shined. Identify any logical or factual inconsistencies displayed by either the assistant or the student in the summary. Refer to the user as the student and the assistant as the teaching assistant." }, 
        {role: "user", content: userMessages.toString()}
      ],
      model: "gpt-4",
    })

    console.log(chatCompletion.choices[0].message.content)

    await updateDoc(doc(firestore, "teaching_assistants", topic), {
      chatSummary: chatCompletion.choices[0].message.content
    })
  }

  if (readyState === VoiceReadyState.OPEN) {
    return (
      <FontAwesomeIcon color={'black'} icon={faStop} onClick={() => {
        messages.map((msg, index) => {
          if (msg.type === "user_message" || msg.type === "assistant_message") {
            userMessages.push(msg.type + ": " + msg.message.content);
          }
        })

        gptSummary(userMessages)


        console.log("userMessages")
        console.log(userMessages)
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