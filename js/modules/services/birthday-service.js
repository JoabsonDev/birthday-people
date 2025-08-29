const BASE_URL = "http://localhost:3000";

async function getBirthdayList({ page = 1, perPage = 10, search = "" }) {
  const query = new URLSearchParams({
    _page: page,
    _per_page: perPage,
    ...(search ? { q: search } : {}),
  });

  const res = await fetch(`${BASE_URL}/birthdays?${query.toString()}`);
  const json = await res.json();

  return {
    data: json.data,
    page,
    perPage,
    totalItems: json.items?.count,
    totalPages: json.pages?.last,
    nextPage: json.pages?.next,
    prevPage: json.pages?.prev,
  };
}

export const BirthdayService = () => ({
  getBirthdayList,
});
