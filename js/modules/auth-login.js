import { BASE_URL } from "./constants/base-url.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(loginForm);
      const payload = Object.fromEntries(formData.entries());

      try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);

          location.href = "/";
        } else {
          console.warn("Nenhum access_token retornado pela API.");
        }
      } catch (error) {
        console.error("Erro ao se autenticar:", error);
      }
    });
  }
});
