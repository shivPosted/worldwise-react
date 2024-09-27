const dateFormatter = function (date) {
  if (!date) return;
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
};

export { dateFormatter };
