const truncateDecimals = (number, decimals) => {
  const factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
};

export default truncateDecimals;
