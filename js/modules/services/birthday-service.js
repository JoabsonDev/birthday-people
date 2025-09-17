import { BASE_URL } from "../constants/base-url.js";
import { apiFetch } from "../helpers/api-fetch.js";
import { getAuthHeaders } from "../helpers/get-auth-headers.js";

async function getBirthdayList({
  page = 1,
  perPage = 10,
  search = "",
  group = "",
  month = "",
}) {
  const query = new URLSearchParams({
    _page: page,
    _limit: perPage,
    ...(search ? { name_like: search } : {}),
    ...(group ? { group_like: group } : {}),
    ...(month !== ""
      ? { birthday_like: `-${String(month + 1).padStart(2, "0")}-` }
      : {}),
  });

  const res = await apiFetch(`${BASE_URL}/users?${query.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  const data = await res.json();
  const totalItems = parseInt(res.headers.get("X-Total-Count") || "0", 10);
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    first: 1,
    prev: page > 1 ? page - 1 : null,
    next: page < totalPages ? page + 1 : null,
    last: totalPages,
    pages: totalPages,
    items: totalItems,
    current: page,
  };
}

export async function getGroups() {
  const res = await apiFetch(`${BASE_URL}/birthdays/groups`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  return data;
}

export async function getMonths() {
  const res = await apiFetch(`${BASE_URL}/birthdays/months`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();

  return data;
}

export const BirthdayService = () => ({
  getBirthdayList,
  getGroups,
  getMonths,
});
