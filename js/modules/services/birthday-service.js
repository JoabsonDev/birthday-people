import { MONTH_NAMES } from "../constants/month-names.js";

const BASE_URL = "http://localhost:3000";

async function getBirthdayList({
  page = 1,
  perPage = 10,
  search = "",
  group = "",
  month = "",
}) {
  console.log(month);

  const query = new URLSearchParams({
    _page: page,
    _limit: perPage,
    ...(search ? { name_like: search } : {}),
    ...(group ? { group_like: group } : {}),
    ...(month !== ""
      ? { birthday_like: `-${String(month + 1).padStart(2, "0")}-` }
      : {}),
  });

  const res = await fetch(`${BASE_URL}/birthdays?${query.toString()}`);
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
  const res = await fetch(`${BASE_URL}/birthdays`);
  const data = await res.json();

  const groups = [...new Set(data.map((item) => item.group).filter(Boolean))];

  return groups;
}

export async function getMonths() {
  const res = await fetch(`${BASE_URL}/birthdays`);
  const data = await res.json();

  const monthsFound = new Set(
    data.map((item) => new Date(item.birthday).getMonth())
  );

  const months = MONTH_NAMES.map((name, idx) => ({
    [name]: monthsFound.has(idx),
  }));

  return months;
}

export const BirthdayService = () => ({
  getBirthdayList,
  getGroups,
  getMonths,
});
