export function nextMinute(now = Date.now()) {
  const nextMinute = new Date(now);
  nextMinute.setMinutes(nextMinute.getMinutes() + 1);
  nextMinute.setSeconds(0);
  nextMinute.setMilliseconds(0);
  return nextMinute.getTime() - now;
}
