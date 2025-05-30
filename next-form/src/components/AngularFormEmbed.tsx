"use client";

import React from "react";

interface AngularFormEmbedProps {
  onFormSubmit?: (data: { firstName: string; lastName: string }) => void;
}

export default function AngularFormEmbed({
  onFormSubmit,
}: AngularFormEmbedProps) {
  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === "http://localhost:3001" &&
        event.data &&
        onFormSubmit
      ) {
        onFormSubmit(event.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onFormSubmit]);

  return (
    <iframe
      src="http://localhost:3001" // We'll set up the Angular app to run on this port
      className="w-full h-[300px] border-2 border-gray-200 rounded-lg"
      title="Angular Form"
    />
  );
}
