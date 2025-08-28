import "./modules/header.js";
import "./modules/swiper-config.js";

// const baseUrl = "http://localhost:3000";

// function formatDateBr(dateString) {
//   return new Date(dateString).toLocaleDateString("pt-BR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });
// }

// fetch(`${baseUrl}/birthdays`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);

//     const birthdayList = document.querySelector(".birthday-list");

//     data.forEach((responseItem) => {
//       const birthdayItem = `
//             <li class="birthday-list__item">
//               <span class="name">${responseItem.name}</span>
//               <span class="date">${formatDateBr(responseItem.birthday)}</span>
//               <span class="group">${responseItem.group || "--"}</span>
//               <div>
//                 <button
//                   class="edit fa-solid fa-pencil"
//                   aria-label="Editar"
//                 ></button>
//                 <button
//                   class="delete fa-solid fa-trash"
//                   aria-label="Excluir"
//                 ></button>
//               </div>
//             </li>
//         `;
//       birthdayList.insertAdjacentHTML("beforeend", birthdayItem);
//     });
//   })
//   .catch((error) => {});
