const formatRuntime = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const hrsDisplay = hrs > 0 ? `${hrs}h` : "";
  const minsDisplay = mins > 0 ? `${mins}m` : "";
  return [hrsDisplay, minsDisplay].filter(Boolean).join(" ");
};

export default formatRuntime;
