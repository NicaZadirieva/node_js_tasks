/**
 * Парсит время на часы, минуты и секунды
 * @param {string} time время из консоли вида '1h 5m 3s'
 * @returns
 */
function parseTimeStr(time) {
  const pattern = /(\d+)h\s+(\d+)m\s+(\d+)s/;
  if (!pattern.test(time)) {
    throw new Error('Invalid time format. Expected "1h 5m 3s"');
  }
  const [hours = 0, minutes = 0, seconds = 0] = time.match(pattern).slice(1);

  return { hours, minutes, seconds };
}
function createTimer(time, message) {
  const { hours, minutes, seconds } = parseTimeStr(time);
  console.log(hours, minutes, seconds);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  let remainingMSeconds = totalSeconds * 1000;
  setTimeout(() => {
    console.log(message);
  }, remainingMSeconds);
}

module.exports = { createTimer };
