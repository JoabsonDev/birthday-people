import { buildHomePage } from "./modules/build-birthday-table.js";
import "./modules/header.js";
import { BirthdayService } from "./modules/services/birthday-service.js";
import "./modules/swiper-config.js";

const birthdayService = BirthdayService();

birthdayService
  .getBirthdayList({ page: 1, perPage: 10, search: "" })
  .then(buildHomePage)
  .catch((error) => {});
