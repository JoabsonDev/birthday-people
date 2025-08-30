import { MONTH_NAMES } from "./constants/month-names.js";
import { observable } from "./observable.js";

const FilterControl = () => {
  let filters = { page: 1, perPage: 10, search: "" };

  return {
    getFilters: () => filters,
    setFilters: (newFilters) => {
      filters = { ...filters, ...newFilters };
    },
  };
};

const filterControl = FilterControl();

const searchInput = document.querySelector("#search");
let debounceTimeout;
searchInput.addEventListener("input", (event) => {
  const search = event.target.value;

  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    filterControl.setFilters({
      ...filterControl.getFilters(),
      search,
      page: 1,
    });
    observable.notify();
  }, 500);
});

const pageSize = document.querySelector("#page-size");
pageSize.addEventListener("change", (event) => {
  const perPage = Number(event.target.value);
  filterControl.setFilters({
    ...filterControl.getFilters(),
    perPage,
  });
  observable.notify();
});

const selectGroups = document.querySelector("#groups");
selectGroups.addEventListener("change", (event) => {
  const group = event.target.value;
  filterControl.setFilters({
    ...filterControl.getFilters(),
    group,
  });
  observable.notify();
});

const selectMonths = document.querySelector("#months");
selectMonths.addEventListener("change", (event) => {
  const monthIndex = MONTH_NAMES.findIndex(
    (m) => m.toLowerCase() === event.target.value.toLowerCase()
  );

  filterControl.setFilters({
    ...filterControl.getFilters(),
    month: monthIndex >= 0 ? monthIndex : "",
  });
  observable.notify();
});

export { filterControl };
