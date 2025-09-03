import { BASE_URL } from "./constants/base-url.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("#register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(registerForm);
      const { birthday, ...payload } = Object.fromEntries(formData.entries());

      try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
          method: "POST",
          body: JSON.stringify({
            ...payload,
            birthday: new Date(birthday).toISOString(),
          }),
          headers: { "Content-Type": "application/json" },
        });

        await res.json();
        console.log("Usuário cadastrado com sucesso!");

        location.href = "/login.html";
      } catch (error) {
        console.error("Erro ao se cadastrar:", error);
      }
    });
  }
});
