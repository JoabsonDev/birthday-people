import { MONTH_NAMES } from "./constants/month-names.js";
import { observable } from "./observable.js";

const FilterControl = () => {
  let filters = { page: 1, perPage: 10, search: "" };

  return {
    getFilters: () => filters,
    setFilters: (newFilters) => {
      filters = { ...filters, ...newFilters };
      observable.notify();
    },
  };
};

const filterControl = FilterControl();

/**
 * Função genérica para criar um listener que atualiza filtros
 * @param {HTMLElement} element - Elemento do DOM
 * @param {(value: any) => object} mapValueToFilter - Função que transforma o valor do input em filtros
 * @param {number} [debounceMs] - Opcional: tempo de debounce para inputs de texto
 */
const attachFilterListener = (element, mapValueToFilter, debounceMs) => {
  let debounceTimeout;

  // Detecta o tipo de evento
  const eventType =
    element.tagName === "INPUT" || element.tagName === "TEXTAREA"
      ? "input"
      : "change";

  element.addEventListener(eventType, (event) => {
    const value = event.target.value;

    const applyFilter = () => {
      filterControl.setFilters({
        ...filterControl.getFilters(),
        page: 1,
        ...mapValueToFilter(value),
      });
    };

    if (debounceMs) {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(applyFilter, debounceMs);
    } else {
      applyFilter();
    }
  });
};

const searchInput = document.querySelector("#search");
const pageSize = document.querySelector("#page-size");
const selectGroups = document.querySelector("#groups");
const selectMonths = document.querySelector("#months");

// Input de busca com debounce
attachFilterListener(searchInput, (value) => ({ search: value }), 500);

// Seleção de quantidade por página
attachFilterListener(pageSize, (value) => ({ perPage: Number(value) }));

// Seleção de grupo
attachFilterListener(selectGroups, (value) => ({ group: value }));

// Seleção de mês
attachFilterListener(selectMonths, (value) => {
  const monthIndex = MONTH_NAMES.findIndex(
    (m) => m.toLowerCase() === value.toLowerCase()
  );
  return { month: monthIndex >= 0 ? monthIndex : "" };
});

export { filterControl };
