const BASE_URL = "http://localhost:9000";
const dateFormatter = function (date) {
  if (!date) return;
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
};
const generateId = () => {
  return Math.floor(Math.random() * 1000000); // Generates a number between 0 and 999999
};

export { dateFormatter, BASE_URL, generateId };
