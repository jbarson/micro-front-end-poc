"use client";
import NameForm from "@/components/NameForm";
import AngularFormEmbed from "@/components/AngularFormEmbed";
import SharedFormEmbed from "@/components/SharedFormEmbed"; // <-- Import the new component
import { useState, useEffect } from "react";

export default function Home() {
  const [submittedData, setSubmittedData] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const [angularFormData, setAngularFormData] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const [sharedFormData, setSharedFormData] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null); // <-- State for shared form data

  // Listen for messages from the Angular iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("Received message from Angular iframe:", event.data);
      if (event.data.type === "ANGULAR_FORM_SUBMITTED") {
        setAngularFormData(event.data.data);
      }
      // Listen for messages from the shared form if it's in an iframe (optional)
      if (event.data.type === "SHARED_FORM_SUBMITTED") {
        console.log(
          "Received SHARED_FORM_SUBMITTED via postMessage (e.g., from iframe)"
        );
        setSharedFormData(event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <main className="min-h-screen p-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Next.js Form</h2>
          <NameForm onSubmit={setSubmittedData} />
          {submittedData && (
            <div className="mt-4 p-4 bg-green-100 rounded">
              <h3 className="font-semibold">Submitted Data:</h3>
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Angular Form (Micro Frontend)
          </h2>
          <AngularFormEmbed />
          {angularFormData && (
            <div className="mt-4 p-4 bg-blue-100 rounded">
              <h3 className="font-semibold">
                Received Data from Angular (Iframe):
              </h3>
              <pre>{JSON.stringify(angularFormData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      <hr className="my-8 border-t-2 border-gray-300" />

      <div>
        <h2 className="text-2xl font-bold mb-4">
          Shared Form (Micro Frontend via JS Integration)
        </h2>
        <SharedFormEmbed
          formId="next-embeds-shared-form"
          onFormSubmit={setSharedFormData}
        />
        {sharedFormData && (
          <div className="mt-4 p-4 bg-purple-100 rounded">
            <h3 className="font-semibold">
              Data from Shared Form (JS Integration):
            </h3>
            <pre>{JSON.stringify(sharedFormData, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
