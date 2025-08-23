import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  allowTouchMove: true,
  initialSlide: 1,
});

const buttons = document.querySelectorAll(".bottom-navigation button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const index = parseInt(btn.dataset.index);
    swiper.slideTo(index);
  });
});

swiper.on("slideChange", () => {
  buttons.forEach((btn) => btn.classList.remove("active"));
  buttons[swiper.activeIndex].classList.add("active");
});
