"use client";
import { useState } from "react";
import ClientComponent from "./ClientComponent";
import Controls from "./Controls";
import { FaceWidgets } from "./FaceWidgets";

export default function IntegratedWidget() {
  const [isSessionStarted, setIsSessionStarted] = useState(false);

  const startSession = () => {
    setIsSessionStarted(true);
  };

  const endSession = () => {
    setIsSessionStarted(false);
  };

  return (
    <div>
      {isSessionStarted && (
        <>
          <FaceWidgets onEndSession={endSession} />
          <ClientComponent accessToken="" />
        </>
      )}
      {!isSessionStarted && <button onClick={startSession}>Start Session</button>}
      {isSessionStarted && <button onClick={endSession}>End Session</button>}
    </div>
  );
}