export function eventToDisplay(event, now = Date.now()) {
  const date = getDisplayDate(event.start);
  const start = getDisplayTime(event.start);
  let end = null;
  if (event.end && (event.end !== event.start)) {
    end = getDisplayTime(event.end);
  }
  const { until, code } = getUntil(now, event.start);

  return {
    date,
    start,
    end,
    until,
    code,
  };
}

function getDisplayDate(time) {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return new Date(time).toLocaleDateString(undefined, options);
}

function getDisplayTime(time) {
  const options = {
    hour: 'numeric',
    minute: '2-digit',
  };
  return new Date(time).toLocaleTimeString(undefined, options);
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
    return 'now';
  }
  let text = `${times[i]}${labels[i]}`;
  if (times[i + 1] > 0) {
    text += ` ${times[i + 1]}${labels[i + 1]}`;
  }
  return text;
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

export function editToTime(text, lastTime) {
  const [hoursText, minutesText] = text.split(':');
  const hours = parseInt(hoursText);
  const minutes = parseInt(minutesText);
  const date = new Date(lastTime);

  date.setHours(hours, minutes);
  return date.getTime();
}
