import { FormData } from "@client/form/formValidation";

const API_BASE_URL = "http://localhost:3001/api";

interface ApiResponse {
  success: boolean;
  message: string;
}

export const submitRegistrationForm = async (
  data: FormData
): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Ett fel uppstod vid inskickning av formuläret"
    );
  }

  return result;
};
