const formatTime = date => {
  typeof date === "number" ? (date = new Date(date)) : null;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join("-") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatTimeSimple = date => {
  typeof date === "number" ? (date = new Date(date)) : null;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join(".");
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

module.exports = {
  formatNumber: formatNumber,
  formatTime: formatTime,
  formatTimeSimple
};
