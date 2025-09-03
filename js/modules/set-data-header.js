export function setDataHeader() {
  const userJson = localStorage.getItem("user");
  if (!userJson) return;

  const user = JSON.parse(userJson);

  const nameElement = document.querySelector(".l-header__username");
  const avatarElement = document.querySelector(".l-header__action img");

  if (nameElement) nameElement.textContent = user.name || "";
  if (avatarElement && user.picture)
    avatarElement.src = user.picture || "./assets/img/default-avatar.png";
}
