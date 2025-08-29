const BASE_URL = "http://localhost:3000";

async function getBirthdayList() {
  return await fetch(`${BASE_URL}/birthdays`).then((res) => res.json());
}

export const BirthdayService = () => ({
  getBirthdayList,
});
