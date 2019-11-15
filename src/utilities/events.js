export function eventToDisplay(event, now = Date.now()) {
  const date = getDate(event.start);
  //??? remove start logic in event display
  //??? only if end
  const start = getTime(event.start);
  let end = null;
  if (event.end && event.end !== event.start) {
    end = getTime(event.end);
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

function getDate(time) {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return new Date(time).toLocaleDateString(undefined, options);
}

function getTime(time) {
  const options = {
    hour: 'numeric',
    minute: '2-digit',
  };
  return new Date(time).toLocaleTimeString(undefined, options);
}

function getUntil(from, to) {
  const times = getUntilTimes(from, to);
  const code = getUntilCode(times);
  const until = getUntilText(times);

  return { until, code };
}

function getUntilTimes(from, to) {
  //??? return years, months, weeks, days, hours (max of 2)
  // if less than 1, don't include
  // return until code
  return {};
}

function getUntilCode(times) {
  //??? calculate color code based on times
  return 0;
}

function getUntilText(times) {
  return '2w 5d';
}

export function displayToEvent(display) {
  return {
    text: '',
    start: 0,
    end: 0,
  };
}
