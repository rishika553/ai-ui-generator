const API_BASE_URL = "http://localhost:8000";

const request = async (path, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let parsedDetail = errorText;
      try {
        const jsonErr = JSON.parse(errorText);
        if (jsonErr.detail) parsedDetail = jsonErr.detail;
      } catch (_) {}
      throw new Error(parsedDetail || "Backend service returned an error");
    }

    return await response.json();
  } catch (err) {
    if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
      throw new Error("Backend server is not running on port 8000. Please start the FastAPI backend.");
    }
    throw err;
  }
};

export const generateUI = (prompt) =>
  request("/generate_ui", {
    method: "POST",
    body: JSON.stringify({
      message: prompt,
      modify: false,
    }),
  });

export const editUI = (message, website) =>
  request("/edit_ui", {
    method: "POST",
    body: JSON.stringify({
      message,
      website,
    }),
  });

export const restoreVersion = (versionId) =>
  request(`/restore/${versionId}`, {
    method: "POST",
  });

export const rollbackVersion = () =>
  request("/rollback", {
    method: "POST",
  });
