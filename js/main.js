import {
  buildGroupsFilter,
  buildMonthFilter,
} from "./modules/build-home-page.js";
import { fetchBirthdayList } from "./modules/fetch-birthday-list.js";
import { observable } from "./modules/observable.js";
import "./modules/scroll-header.js";
import { BirthdayService } from "./modules/services/birthday-service.js";
import { setDataHeader } from "./modules/set-data-header.js";
import "./modules/swiper-config.js";

const birthdayService = BirthdayService();

async function initializeApp() {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    location.href = "/login.html";
    return;
  }

  try {
    // Notifica os inscritos para buscar a lista de aniversariantes
    observable.subscribe(fetchBirthdayList);
    observable.notify();

    setDataHeader();

    // Busca grupos e meses simultaneamente
    const [groups, months] = await Promise.all([
      birthdayService.getGroups(),
      birthdayService.getMonths(),
    ]);

    buildGroupsFilter(groups);
    buildMonthFilter(months);
  } catch (error) {
    // Se o erro for 401, redireciona para login
    if (error?.status === 401) {
      console.warn("Sessão expirada. Redirecionando para login...");
      location.href = "/login.html";
    } else {
      console.error("Erro ao inicializar a página:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", initializeApp);
