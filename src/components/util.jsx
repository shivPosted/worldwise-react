const dateFormatter = function (date) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    year: "numeric",
    month: "short",
  }).format(new Date(date));
};

export { dateFormatter };
