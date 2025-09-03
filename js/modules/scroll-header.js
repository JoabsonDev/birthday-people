document.querySelectorAll(".swiper-slide").forEach((el) => {
  el.addEventListener("scroll", function () {
    const header = document.querySelector(".l-header");

    if (this.scrollTop > 24) {
      header.classList.add("l-header--scrolled");
    } else {
      header.classList.remove("l-header--scrolled");
    }
  });
});
