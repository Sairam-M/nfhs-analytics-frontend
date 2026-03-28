const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));

      if (res.status === 400) {
        throw new Error(errorData.detail || "Bad request");
      } else if (res.status === 500) {
        throw new Error("Server error");
      } else {
        throw new Error("Something went wrong");
      }
    }

    return res.json();

  } catch (err: any) {
    throw new Error(err.message || "Network error");
  }
};