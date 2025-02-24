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

  if (time.includes("m")) {
    const minutesIndex = time.indexOf("m");
    // Индекс начала числа для значения минут
    const startMinutesValue =
      time.substring(0, minutesIndex).lastIndexOf(" ") + 1;
    minutes = parseInt(time.substring(startMinutesValue, minutesIndex));
  }
  if (time.includes("s")) {
    const secIndex = time.indexOf("s");
    // Индекс начала числа для значения секунд
    const startSecValue = time.substring(0, secIndex).lastIndexOf(" ") + 1;
    seconds = parseInt(time.substring(startSecValue, secIndex));
  }
  if (time.includes("ms")) {
    const msIndex = time.indexOf("ms");
    // Индекс начала числа для значения миллисекунд
    const startMsValue = time.substring(0, msIndex).lastIndexOf(" ") + 1;
    milliseconds = parseInt(time.substring(startMsValue, msIndex));
  }

  return { hours, minutes, seconds, milliseconds };
}
function createTimer(time, message) {
  const { hours, minutes, seconds, milliseconds } = parseTimeStr(time);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  let remainingMSeconds = totalSeconds * 1000 + milliseconds;
  setTimeout(() => {
    console.log(message);
  }, remainingMSeconds);
}

createTimer("45s", "Время вышло!");
