export const generateUI = async (prompt) => {
  const response = await fetch(
    "http://localhost:8000/generate_ui",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        modify: false,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Backend not running");
  }

  return response.json();
};
