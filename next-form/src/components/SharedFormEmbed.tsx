"use client";

import React, { useEffect, useRef, useState } from "react";

interface SharedFormEmbedProps {
  formId: string;
  onFormSubmit?: (data: { firstName: string; lastName: string }) => void;
}

declare global {
  interface Window {
    renderSharedForm: (
      containerId: string,
      onSubmitCallback: (data: { firstName: string; lastName: string }) => void
    ) => void;
  }
}

export default function SharedFormEmbed({
  formId,
  onFormSubmit,
}: SharedFormEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const scriptId = "shared-form-script";
    if (document.getElementById(scriptId)) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "http://localhost:3002/form.js";
    script.async = true;
    script.onload = () => {
      console.log("Shared form script loaded.");
      setIsScriptLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load shared form script.");
    };
    document.body.appendChild(script);

    return () => {
      // Optional: remove script if component unmounts, though often not necessary
      // const existingScript = document.getElementById(scriptId);
      // if (existingScript) document.body.removeChild(existingScript);
    };
  }, []);

  useEffect(() => {
    if (isScriptLoaded && containerRef.current && window.renderSharedForm) {
      console.log(`Rendering shared form into ${formId}`);
      window.renderSharedForm(formId, (data) => {
        console.log(`Shared form (${formId}) submitted in Next.js:`, data);
        if (onFormSubmit) {
          onFormSubmit(data);
        }
      });
    } else if (isScriptLoaded && !window.renderSharedForm) {
      console.warn(
        "renderSharedForm is not available on window even after script load."
      );
    } else if (isScriptLoaded && !containerRef.current) {
      console.warn("Container ref is not yet available.");
    }
  }, [isScriptLoaded, formId, onFormSubmit]);

  return (
    <div id={formId} ref={containerRef}>
      Loading shared form...
    </div>
  );
}
