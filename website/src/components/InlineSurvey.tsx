"use client";

import { useState } from "react";
import posthog from "posthog-js";

const SURVEY_ID = "";

export function InlineSurvey() {
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    posthog.capture("survey sent", {
      $survey_id: SURVEY_ID,
      $survey_response: response,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-background rounded-2xl shadow-lg p-6 text-center">
        <p className="text-lg font-medium text-primary">Thank you for your feedback! 🎉</p>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-2xl shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold">What can we do to improve our product?</h3>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        className="textarea textarea-bordered w-full min-h-24"
        placeholder="Your thoughts..."
      />
      <button onClick={submit} disabled={!response} className="btn btn-primary">
        Submit
      </button>
    </div>
  );
}
