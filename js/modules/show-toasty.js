export function showToast(message, type = "success", duration = 5000) {
  const container = document.getElementById("toast-container");

  // cria elemento toast
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;

  toast.innerHTML = `
    <span class="toast__message">${message}</span>
    <button class="toast__dismiss">&times;</button>
  `;

  // botão de dismiss
  const dismissBtn = toast.querySelector(".toast__dismiss");
  dismissBtn.addEventListener("click", () => removeToast(toast));

  // adiciona no container
  container.appendChild(toast);

  // remove automaticamente após X segundos
  const timer = setTimeout(() => removeToast(toast), duration);

  // garante que ao clicar, não deixa o timer duplicar
  function removeToast(el) {
    el.style.animation = "fadeOut 0.3s forwards";
    setTimeout(() => el.remove(), 300);
    clearTimeout(timer);
  }
}
