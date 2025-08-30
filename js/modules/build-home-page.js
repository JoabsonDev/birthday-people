import { filterControl } from "./filter-control.js";
import { formatDateBr } from "./helpers/formate-date-br.js";
import { observable } from "./observable.js";

const buildBirthdayTable = (data) => {
  const home = document.querySelector("#home");
  home.querySelector(".l-birthday-table")?.remove();

  const birthdayListTable = document.createElement("table");
  birthdayListTable.setAttribute("aria-describedby", "table-description");
  birthdayListTable.classList.add("l-birthday-table");

  birthdayListTable.innerHTML = `
    <caption id="table-description">
        Tabela com os nomes, datas de nascimento, grupos e ações
        disponíveis.
    </caption>
    <thead>
        <tr>
            <th scope="col">Nome</th>
            <th scope="col">Nascimento</th>
            <th scope="col">Grupo</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
  `;

  const birthdayListTableBody = document.createElement("tbody");

  data.forEach(({ id, name, birthday, group }) => {
    const birthdayItem = document.createElement("tr");
    birthdayItem.setAttribute("role", "row");
    birthdayItem.innerHTML = `    
        <td role="cell">${name}</td>
        <td role="cell">${formatDateBr(birthday)}</td>
        <td role="cell">${group || "--"}</td>
    `;

    const actionsCell = document.createElement("td");
    actionsCell.setAttribute("role", "cell");
    actionsCell.classList.add("actions");

    const editButton = document.createElement("button");
    editButton.classList.add("edit", "ph-duotone", "ph-pencil");
    editButton.setAttribute("aria-label", "Editar");
    editButton.addEventListener("click", () => {
      console.log("Editar", id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete", "ph-duotone", "ph-trash");
    deleteButton.setAttribute("aria-label", "Excluir");
    deleteButton.addEventListener("click", () => {
      console.log("Excluir", id);
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
    birthdayItem.appendChild(actionsCell);
    birthdayListTableBody.appendChild(birthdayItem);
    birthdayListTable.appendChild(birthdayListTableBody);
    home.appendChild(birthdayListTable);
  });
};

export const buildGroupsFilter = (data) => {
  const selectGroups = document.querySelector("#groups");
  selectGroups.innerHTML = `
  <option value="">todos</option>
  `;
  data.forEach((group) => {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = group;
    selectGroups.appendChild(option);
  });
};

export const buildMonthFilter = (data) => {
  const selectMonth = document.querySelector("#months");
  selectMonth.innerHTML = `
    <option value="">todos</option>
  `;

  data.forEach((item) => {
    const [month, enabled] = Object.entries(item)[0];

    const option = document.createElement("option");
    option.value = month;
    option.textContent = month;
    option.disabled = !enabled;

    selectMonth.appendChild(option);
  });
};

const buildPagination = (pagination) => {
  const home = document.querySelector("#home");
  home.querySelector(".c-pagination")?.remove();
  const { first, prev, current, next, last, pages } = pagination;

  const nav = document.createElement("nav");
  nav.classList.add("c-pagination");
  nav.setAttribute("aria-label", "Paginação");

  nav.addEventListener("click", (e) => {
    if (e.target.tagName !== "A") return;
    e.preventDefault();
    const page = Number(e.target.dataset.page);
    if (!page || page === current) return;

    filterControl.setFilters({
      ...filterControl.getFilters(),
      page,
    });
    observable.notify();
  });

  const ul = document.createElement("ul");

  const firstPageClass = !prev
    ? "c-pagination__link c-pagination__link--disabled"
    : "c-pagination__link";

  const lastPageClass = !next
    ? "c-pagination__link c-pagination__link--disabled"
    : "c-pagination__link";

  const maxPagesToShow = 3;
  let startPage = Math.max(current - 1, 1);
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > pages) {
    endPage = pages;
    startPage = Math.max(endPage - maxPagesToShow + 1, 1);
  }

  let pageLinks = "";
  for (let i = startPage; i <= endPage; i++) {
    const activeClass = i === current ? "c-pagination__link--active" : "";
    pageLinks += `
      <li>
        <a href="#" class="c-pagination__link ${activeClass}" data-page="${i}" aria-label="Página ${i}">
          ${i}
        </a>
      </li>
    `;
  }

  ul.innerHTML = `
    <li>
      <a href="#" class="${firstPageClass}" data-page="${first}" aria-label="Primeira página">
        <span class="fa-solid fa-angles-left"></span>
      </a>
    </li>
    <li>
      <a href="#" class="${firstPageClass}" data-page="${prev}" aria-label="Página anterior">
        <span class="fa-solid fa-angle-left"></span>
      </a>
    </li>

    ${pageLinks}

    <li>
      <a href="#" class="${lastPageClass}" data-page="${next}" aria-label="Próxima página">
        <span class="fa-solid fa-angle-right"></span>
      </a>
    </li>
    <li>
      <a href="#" class="${lastPageClass}" data-page="${last}" aria-label="Última página">
        <span class="fa-solid fa-angles-right"></span>
      </a>
    </li>
  `;

  nav.appendChild(ul);
  home.appendChild(nav);
};

export const buildHomePage = ({ data, ...pagination }) => {
  buildBirthdayTable(data);
  buildPagination(pagination);
};
