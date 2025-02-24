function parseTimeStr(time) {
  let hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0;

  if (time.includes("h")) {
    const hourIndex = time.indexOf("h");
    // Индекс начала числа для значения часов
    const startHourValue = time.substring(0, hourIndex).lastIndexOf(" ") + 1;
    hours = parseInt(time.substring(startHourValue, hourIndex));
  }
  let msIndex = time.indexOf("ms");
  if (time.includes("ms")) {
    // Индекс начала числа для значения миллисекунд
    const startMsValue = time.substring(0, msIndex).lastIndexOf(" ") + 1;
    milliseconds = parseInt(time.substring(startMsValue, msIndex));
  }
  if (time.includes("m")) {
    let minutesIndex = time.indexOf("m");
    if (minutesIndex == msIndex) {
      minutesIndex = time.indexOf("m", msIndex + 1);
    }
    if (minutesIndex !== -1) {
      // Индекс начала числа для значения минут
      const startMinutesValue =
        time.substring(0, minutesIndex).lastIndexOf(" ") + 1;
      minutes = parseInt(time.substring(startMinutesValue, minutesIndex));
    }
  }
  if (time.includes("s")) {
    const secIndex = time.indexOf("s");
    // Индекс начала числа для значения секунд
    const startSecValue = time.substring(0, secIndex).lastIndexOf(" ") + 1;
    seconds = parseInt(time.substring(startSecValue, secIndex));
  }

  return { hours, minutes, seconds, milliseconds };
}
function createTimer(time, message) {
  const { hours, minutes, seconds, milliseconds } = parseTimeStr(time);
  console.log(hours, minutes, seconds, milliseconds);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  let remainingMSeconds = totalSeconds * 1000 + milliseconds;
  console.log(remainingMSeconds);
  setTimeout(() => {
    console.log(message);
  }, remainingMSeconds);
}

module.exports = { createTimer };
