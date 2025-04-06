"use client";

import { useState } from "react";

export default function NameCollector() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const webhookUrl = "https://script.google.com/macros/s/AKfycby0-NT1l7wYOLQEhZK2nIbEL-lSDzTff8Drisw9NOD0UOpj6qvvtKj206yHYhfv4fRX/exec"; // <- use your URL

      const res = await fetch(webhookUrl, {
        method: "POST",
        body: new URLSearchParams({ name }),
      });

      if (res.ok) {
        setStatus("✔️ Name submitted!");
        setName("");
      } else {
        setStatus("❌ Submission failed.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ An error occurred.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-xl text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add your name ✍️</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="flex-1 px-4 py-2 rounded bg-gray-700 focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 transition"
        >
          Add
        </button>
      </form>
      {status && <p className="mt-4 text-sm text-purple-300">{status}</p>}
    </div>
  );
}
