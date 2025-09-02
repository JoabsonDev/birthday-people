import { BASE_URL } from "./constants/base-url.js";
import { decodeJWT } from "./helpers/decode-jwt.js";
import { getAuthHeaders } from "./helpers/get-auth-headers.js";

async function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token:", response.credential);

  const responsePayload = decodeJWT(response.credential);

  console.log("Decoded JWT ID token fields:");
  console.log("  Full Name:", responsePayload.name);
  console.log("  Given Name:", responsePayload.given_name);
  console.log("  Family Name:", responsePayload.family_name);
  console.log("  Unique ID:", responsePayload.sub);
  console.log("  Profile image URL:", responsePayload.picture);
  console.log("  Email:", responsePayload.email);

  const res = await fetch(`${BASE_URL}/auth/google`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: response.credential }),
  });
  const data = await res.json();
  console.log(data);
}

window.handleCredentialResponse = handleCredentialResponse;
