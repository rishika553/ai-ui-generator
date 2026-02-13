export const generateUI = async (prompt) => {
  const response = await fetch("http://127.0.0.1:8000/generate_ui", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: prompt,   // ⚠️ MUST be "message" (matches FastAPI)
      modify: false
    }),
  });

  if (!response.ok) {
    throw new Error("Backend not running");
  }

  return response.json();
};
