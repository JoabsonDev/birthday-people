import { formatDateBr } from "./helpers/formate-date-br.js";

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

const buildPagination = (pagination) => {
  console.log(pagination);
};

export const buildHomePage = ({ data, ...pagination }) => {
  buildBirthdayTable(data);
  buildPagination(pagination);
};
