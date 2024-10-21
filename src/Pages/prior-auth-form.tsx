// import React from "react";

// const PriorAuthForm: React.FC = () => {
//   return (
//     <>
//       <div className="text-pink-400">request data here</div>
//     </>
//   );
// };

// export default PriorAuthForm;

import React, { useState } from "react";
import axios from "axios";

export interface AuthorizationRequest {
  patientId: string;
  treatmentType: string;
  doctorNotes: string;
  status?: "pending" | "approved" | "denied";
}

interface PriorAuthFormProps {
  patientId: string; // We'll keep this prop for future use if needed
}

const PriorAuthForm: React.FC<any> = ({ patientId }) => {
  const [formData, setFormData] = useState<AuthorizationRequest>({
    patientId: patientId,
    treatmentType: "",
    doctorNotes: "",
    status: "pending",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/request/createRequest",
        formData
      );
      console.log(response.data);
      setSubmitMessage({
        type: "success",
        text: "Prior authorization request submitted successfully!",
      });
    } catch (error) {
      console.error(error);
      setSubmitMessage({
        type: "error",
        text: "Failed to submit prior authorization request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label
          htmlFor="treatmentType"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Treatment Type
        </label>
        <input
          type="text"
          id="treatmentType"
          name="treatmentType"
          value={formData.treatmentType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bk-blue focus:border-bk-blue"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="doctorNotes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Doctor's Notes
        </label>
        <textarea
          id="doctorNotes"
          name="doctorNotes"
          value={formData.doctorNotes}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bk-blue focus:border-bk-blue"
          required
        />
      </div>
      {submitMessage && (
        <div
          className={`mb-4 p-2 rounded ${
            submitMessage.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {submitMessage.text}
        </div>
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-bk-blue text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bk-blue"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Prior Authorization Request"}
      </button>
    </form>
  );
};

export default PriorAuthForm;
