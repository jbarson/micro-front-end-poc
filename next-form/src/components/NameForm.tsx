"use client";

import { FormEvent, useState } from "react";

interface NameFormProps {
  onSubmit: (data: { firstName: string; lastName: string }) => void;
}

export default function NameForm({ onSubmit }: NameFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
          First Name:
        </label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, firstName: e.target.value }))
          }
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium mb-1">
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, lastName: e.target.value }))
          }
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
