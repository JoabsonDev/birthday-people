export function formatDateBr(dateString) {
  if (!dateString) return "";

  // Extrai somente a parte da data (YYYY-MM-DD)
  const datePart = dateString.split("T")[0];
  const [year, month, day] = datePart.split("-").map(Number);

  // Cria a data local sem deslocamento de timezone
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
