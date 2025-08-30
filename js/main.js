import {
  buildGroupsFilter,
  buildMonthFilter,
} from "./modules/build-home-page.js";
import { fetchBirthdayList } from "./modules/fetch-birthday-list.js";
import { observable } from "./modules/observable.js";
import "./modules/scroll-header.js";
import { BirthdayService } from "./modules/services/birthday-service.js";
import "./modules/swiper-config.js";

const birthdayService = BirthdayService();

observable.subscribe(fetchBirthdayList);

document.addEventListener("DOMContentLoaded", async () => {
  observable.notify();

  birthdayService.getGroups().then(buildGroupsFilter);
  birthdayService.getMonths().then(buildMonthFilter);
});
