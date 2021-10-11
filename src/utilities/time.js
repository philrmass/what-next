export function nextMinute(now = Date.now()) {
  const nextMinute = new Date(now);
  nextMinute.setMinutes(nextMinute.getMinutes() + 1);
  nextMinute.setSeconds(0);
  nextMinute.setMilliseconds(0);
  return nextMinute.getTime() - now;
}

export function nextHalfHour(time) {
  const date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  if (minutes > 30) {
    hours = hours + 1;
    minutes = 0;
  } else if (minutes > 0) {
    minutes = 30;
  }

  date.setHours(hours, minutes, 0, 0);
  return date.getTime();
}

export function moveTimeToDate(time, date) {
  if (!time) {
    return time;
  }

  const times = new Date(time);
  const value = new Date(date);
  value.setHours(times.getHours(), times.getMinutes());
  return value.getTime();
}
