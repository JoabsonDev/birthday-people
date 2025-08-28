window.addEventListener("scroll", function () {
  const header = document.querySelector(".l-header");
  if (window.scrollY > 24) {
    header.classList.add("l-header--scrolled");
  } else {
    header.classList.remove("l-header--scrolled");
  }
});
