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

export { filterControl };
