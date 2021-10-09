export function nextMinute(now = Date.now()) {
  const nextMinute = new Date(now);
  nextMinute.setMinutes(nextMinute.getMinutes() + 1);
  nextMinute.setSeconds(0);
  nextMinute.setMilliseconds(0);
  return nextMinute.getTime() - now;
}

export function timeToDate(time) {
  const date = new Date(time);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export function expDaysTime(max) {
  const mult = Math.log(max + 1);
  const days = Math.exp(mult * Math.random()) - 1;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round(days * oneDay);
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

export function getDisplayDate(at) {
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return new Date(at).toLocaleDateString(undefined, options);
}

export function getDisplayTime(at) {
  if (!at) {
    return '';
  }

  const options = {
    hour: 'numeric',
    minute: '2-digit',
  };
  return new Date(at).toLocaleTimeString(undefined, options);
}
