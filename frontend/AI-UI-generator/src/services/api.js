export const generateUI = async (prompt) => {
  const response = await fetch("https://ai-ui-generator-eden.onrender.com", {
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
