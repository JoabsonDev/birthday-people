const BASE_URL = "http://localhost:3000";

async function getBirthdayList({ page = 1, perPage = 10, search = "" }) {
  const query = new URLSearchParams({
    _page: page,
    _limit: perPage,
    ...(search ? { name_like: search } : {}),
  });

  const res = await fetch(`${BASE_URL}/birthdays?${query.toString()}`);
  const data = await res.json();

  // pega total de registros
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
  };
}

export const BirthdayService = () => ({
  getBirthdayList,
});
