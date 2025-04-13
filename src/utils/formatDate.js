const formatDate = (date, format) => {
  const dateObj = new Date(date);

  if (isNaN(dateObj)) {
    throw new Error("Invalid date");
  }

  const options = {};

  if (format.includes("yyyy")) {
    options.year = "numeric";
  }
  if (format.includes("mm")) {
    options.month = format.includes("mm/yyyy") ? "2-digit" : "long";
  }
  if (format.includes("dd")) {
    options.day = "2-digit";
  }

  return new Intl.DateTimeFormat("en", options).format(dateObj);
};

export default formatDate;
