const BASE_URL = "http://localhost:3000";

async function getBirthdayList(page = 1, limit = 10) {
  const res = await fetch(
    `${BASE_URL}/birthdays?_page=${page}&_limit=${limit}`
  );
  const data = await res.json();
  const total = res.headers.get("X-Total-Count"); // total de registros

  return {
    data,
    total: Number(total),
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export const BirthdayService = () => ({
  getBirthdayList,
});
