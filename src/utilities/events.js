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

  const points = [
    { name: 'hour', value: 0, r: 255, g: 224, b: 210 },
    { name: 'day', value: 4.585, r: 249, g: 208, b: 165 },
    { name: 'week', value: 7.392, r: 171, g: 197, b: 211 },
    { name: 'month', value: 9.511, r: 159, g: 174, b: 197 },
    { name: 'year', value: 13.098, r: 183, g: 164, b: 185 },
    { name: 'fiveYears', value: 15.420, r: 177, g: 173, b: 184 },
  ];

  const index = points.findIndex((point, index) => {
    const next = points[index + 1];
    if (log >= point.value && log < next?.value) {
      return true;
    }
    return false;
  });

  const lastIndex = points.length - 1;
  const minIndex = index >= 0 ? index : lastIndex;
  const maxIndex = index >= 0 ? index + 1 : lastIndex;

  if (minIndex === maxIndex) {
    const point = points[minIndex];

    return `rgb(${point.r}, ${point.g}, ${point.b})`;
  }

  const min = points[minIndex];
  const max = points[maxIndex];
  const maxRatio = (log - min.value) / (max.value - min.value);
  const minRatio = 1 - maxRatio;

  const r = minRatio * min.r + maxRatio * max.r;
  const g = minRatio * min.g + maxRatio * max.g;
  const b = minRatio * min.b + maxRatio * max.b;

  return `rgb(${r}, ${g}, ${b})`;
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
