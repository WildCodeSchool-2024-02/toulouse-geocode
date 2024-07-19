export const newDateToSql = () =>
  new Date().toISOString().slice(0, 19).replace("T", " ");
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", options);
};
