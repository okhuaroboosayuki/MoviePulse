import truncateDecimals from "./truncateDecimals";

const formatNumber = (number) => {
  if (number >= 1_000_000) {
    return `${truncateDecimals(number / 1_000_000, 1)}M`;
  } else if (number >= 1_000) {
    return `${truncateDecimals(number / 1_000, 1)}k`;
  } else {
    return truncateDecimals(number, 0).toString();
  }
};

export default formatNumber;
