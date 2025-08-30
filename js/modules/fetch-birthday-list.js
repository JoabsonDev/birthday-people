import { buildHomePage } from "./build-birthday-table.js";
import { filterControl } from "./filter-control.js";
import { BirthdayService } from "./services/birthday-service.js";

const birthdayService = BirthdayService();

export const fetchBirthdayList = () => {
  birthdayService
    .getBirthdayList(filterControl.getFilters())
    .then(buildHomePage)
    .catch((error) => {
      console.error(error);
    });
};
