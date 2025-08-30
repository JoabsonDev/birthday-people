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
searchInput.addEventListener("input", (event) => {
  const search = event.target.value;
  filterControl.setFilters({
    ...filterControl.getFilters(),
    search,
    page: 1,
  });
  observable.notify();
});

export { filterControl };
