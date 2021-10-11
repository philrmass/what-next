import { v4 as uuidv4 } from 'uuid';

import { nextHalfHour } from './time';

export function getColor(from, to) {
  const oneHour = 1000 * 60 * 60;
  const diff = (to - from) / oneHour;
  const hours = Math.max(1, diff);
  const log = Math.log2(hours);

  if (diff < 0) {
    return '#8c8c8c';
  }

  //??? interpolate between colors
  if (log > 15.4) {
    return '#c9c5d0';
  } else if (log > 13.1) {
    return '#d3c5dc';
  } else if (log > 9.5) {
    return '#c0b2d3';
  } else if (log > 7.4) {
    return '#9faec5';
  } else if (log > 4.6) {
    return '#f9d0a5';
  }
  return '#f7b0b2';
}

export function getDateInput(date) {
  if (!date) {
    return '';
  }

  const value = new Date(date);
  const year = `${value.getFullYear()}`.padStart(4, '0');
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = value.getDate().toString();
  return `${year}-${month}-${day.padStart(2, '0')}`;
}

export function getDefaultEvent(now = Date.now()) {
  const oneDay = 1000 * 60 * 60 * 24;
  const target = now + oneDay;
  const at = nextHalfHour(target);

  return {
    id: uuidv4(),
    at,
    duration: 0,
    text: '',
  };
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

export function getEventsOrder(events) {
  return Object.keys(events).sort((a, b) => events[a].at - events[b].at);
}

export function getInputDate(text, lastDate) {
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

export function getInputTime(text, baseTime) {
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

export function getSaveFilePath(at = Date.now()) {
  const when = new Date(at);
  const year = when.getFullYear();
  const month = `${when.getMonth() + 1}`.padStart(2, '0');
  const date = `${when.getDate()}`.padStart(2, '0');

  return `whatNext_${year}_${month}_${date}.json`;
}

export function getTimeInput(time) {
  //??? fix midnight bugs
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

export function getUntil(from, to) {
  const times = getUntilTimes(from, to);
  return getUntilText(times);
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

export function parseEvents(data) {
  const now = Date.now();

  return Object.values(data).reduce((events, item) => ({
    ...events,
    [item.id]: {
      id: item.id,
      at: item.at ?? now,
      duration: item.duration ?? 0,
      text: item.text ?? '',
    },
  }), {});
}
