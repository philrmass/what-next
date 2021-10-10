export function eventToDisplay(event, now = Date.now()) {
  const date = getDisplayDate(event.date);
  let start = null;
  let end = null;
  if (event.start) {
    start = getDisplayTime(event.start);
  }
  if (event.end) {
    end = getDisplayTime(event.end);
  }

  let { until, code } = getUntil(now, event.start || event.date);
  if (isDuring(event, now)) {
    until = 'now';
    code = 1;
  }

  return {
    date,
    start,
    end,
    until,
    code,
  };
}

export function getUntilz(from, to) {
  const times = getUntilTimes(from, to);
  return getUntilText(times);
}

function getUntil(from, to) {
  if (!to) {
    return { until: '', code: 0 };
  }
  const times = getUntilTimes(from, to);
  const code = getUntilCode(times);
  const until = getUntilText(times);

  return { until, code };
}

function getUntilTimes(from, to) {
  const oneMinute = 60 * 1000;
  const oneHour = 60 * oneMinute;
  const oneDay = 24 * oneHour;

  let diff = to - from;
  if (diff < 0) {
    return null;
  }

  const longYear = 366 * oneDay;
  let years = Math.floor(diff / longYear);
  while (diff >= yearsFrom(years + 1, from)) {
    years++;
  }
  diff -= yearsFrom(years, from);

  const longMonth = 32 * oneDay;
  let months = Math.floor(diff / longMonth);
  while (diff >= monthsFrom(months + 1, from)) {
    months++;
  }
  diff -= monthsFrom(months, from);

  const oneWeek = 7 * oneDay;
  const weeks = Math.floor(diff / oneWeek);
  diff -= weeks * oneWeek;
  const days = Math.floor(diff / oneDay);
  diff -= days * oneDay;
  const hours = Math.floor(diff / oneHour);
  diff -= hours * oneHour;
  const minutes = Math.floor(diff / oneMinute);
  diff -= minutes * oneMinute;

  return [years, months, weeks, days, hours, minutes];
}

function yearsFrom(years, time) {
  const date = new Date(time);
  date.setFullYear(date.getFullYear() + years);
  return date.getTime() - time;
}

function monthsFrom(months, time) {
  const date = new Date(time);
  date.setMonth(date.getMonth() + months);
  return date.getTime() - time;
}

function getUntilCode(times) {
  if (!times) {
    return 0;
  }
  const i = times.findIndex((time) => time !== 0);
  if (i < 0) {
    return 1;
  }
  return 6 - i;
}

function getUntilText(times) {
  if (!times) {
    return 'past';
  }
  const labels = ['y', 'm', 'w', 'd', 'h', 'm'];
  const i = times.findIndex((time) => time !== 0);
  if (i < 0) {
    return '< 1m';
  }
  let text = `${times[i]}${labels[i]}`;
  if (times[i + 1] > 0) {
    text += ` ${times[i + 1]}${labels[i + 1]}`;
  }
  return text;
}

export function dateToEdit(date) {
  if (!date) {
    return '';
  }

  const value = new Date(date);
  const year = `${value.getFullYear()}`.padStart(4, '0');
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = value.getDate().toString();
  return `${year}-${month}-${day.padStart(2, '0')}`;
}

export function timeToEdit(time) {
  if (!time) {
    return '';
  }

  const options = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(time).toLocaleTimeString('en', options);
}

export function editToDate(text, lastDate) {
  if (!text) {
    return lastDate;
  }

  const [yearText, monthText, dayText] = text.split('-');
  const year = parseInt(yearText);
  const month = parseInt(monthText) - 1;
  const day = parseInt(dayText);
  if (Number.isInteger(year) && Number.isInteger(month) && Number.isInteger(day)) {
    return (new Date(year, month, day)).getTime();
  }
}

export function editToTime(text, baseTime) {
  if (!text) {
    return null;
  }

  const [hoursText, minutesText] = text.split(':');
  const hours = parseInt(hoursText);
  const minutes = parseInt(minutesText);
  const value = new Date(baseTime);
  value.setHours(hours, minutes, 0, 0);
  return value.getTime();
}

function isDuring(event, now) {
  return (now > event.start && now <= event.end);
}

export function getEventsOrder(events) {
  return Object.keys(events);
}

export function getDisplayDate(time) {
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return new Date(time).toLocaleDateString(undefined, options);
}

export function getDisplayTime(time) {
  const options = {
    hour: 'numeric',
    minute: '2-digit',
  };
  return new Date(time).toLocaleTimeString(undefined, options);
}
