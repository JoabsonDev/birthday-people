import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  allowTouchMove: true,
  initialSlide: 1,
});

const buttons = document.querySelectorAll(".c-bottom-navigation__item");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const index = parseInt(btn.dataset.index);
    swiper.slideTo(index);
  });
});

swiper.on("slideChange", ({ activeIndex }) => {
  if (activeIndex === 1) {
    document
      .querySelector(".l-header__search")
      .classList.remove("l-header__search--hidden");
  } else {
    document
      .querySelector(".l-header__search")
      .classList.add("l-header__search--hidden");
  }

  buttons.forEach((btn) =>
    btn.classList.remove("c-bottom-navigation__item--active")
  );
  buttons[swiper.activeIndex].classList.add(
    "c-bottom-navigation__item--active"
  );
});
