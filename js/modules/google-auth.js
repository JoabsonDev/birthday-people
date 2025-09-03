import { BASE_URL } from "./constants/base-url.js";
import { decodeJWT } from "./helpers/decode-jwt.js";
import { getAuthHeaders } from "./helpers/get-auth-headers.js";

async function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token:", response.credential);

  const responsePayload = decodeJWT(response.credential);

  try {
    const res = await fetch(`${BASE_URL}/auth/google`, {
      method: "POST",
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: response.credential }),
    });

    const data = await res.json();

    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(responsePayload));

      location.href = "/";
    } else {
      console.warn("Nenhum access_token retornado pela API.");
    }
  } catch (error) {
    console.error("Erro ao autenticar com Google:", error);
  }
}

window.handleCredentialResponse = handleCredentialResponse;
