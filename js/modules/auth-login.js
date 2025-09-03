import { BASE_URL } from "./constants/base-url.js";
import { showToast } from "./show-toasty.js";

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

          showToast("Login efetuado com sucesso!", "success");

          location.href = "/";
        } else {
          showToast("Erro ao se autenticar. Tente novamente!", "error");
          console.warn("Nenhum access_token retornado pela API.");
        }
      } catch (error) {
        showToast("Erro ao se autenticar. Tente novamente!", "error");
        console.error("Erro ao se autenticar:", error);
      }
    });
  }
});
