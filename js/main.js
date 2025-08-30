import { fetchBirthdayList } from "./modules/fetch-birthday-list.js";
import { observable } from "./modules/observable.js";
import "./modules/scroll-header.js";
import "./modules/swiper-config.js";

observable.subscribe(fetchBirthdayList);

document.addEventListener("DOMContentLoaded", () => {
  observable.notify();
});
