import { BirthdayService } from "./modules/birthday-service.js";
import { buildBirthdayTable } from "./modules/build-birthday-table.js";
import "./modules/header.js";
import "./modules/swiper-config.js";

const birthdayService = BirthdayService();

birthdayService
  .getBirthdayList()
  .then(buildBirthdayTable)
  .catch((error) => {});
