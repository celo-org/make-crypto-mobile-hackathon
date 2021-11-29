import moment from "moment"

export const secondsElapsedInPercent = (time: number): number => {
  const now = moment(); //todays date
  const end = moment(time * 1000 + 60 * 1000); // another date
  const duration = moment.duration(end.diff(now));
  const secondsLeft = duration.asSeconds();
  const elapsed = 60 - (secondsLeft < 0 ? 0 : secondsLeft)
  console.log('DateUtils', elapsed / 60)
  return elapsed / 60
}

export const secondsElapsed = (time: number): number => {
  const now = moment(); //todays date
  const end = moment(time * 1000 + 60 * 1000); // another date
  const duration = moment.duration(end.diff(now));
  const secondsLeft = duration.asSeconds();
  return 60 - (secondsLeft < 0 ? 0 : secondsLeft)
}

export const balanceElapsedInPercent = (time: number, total: number): number => {
  const now = moment(); //todays date
  const end = moment(time * 1000 + 60 * 1000); // another date
  const duration = moment.duration(end.diff(now));
  const secondsLeft = duration.asSeconds();
  const elapsed = 60 - (secondsLeft < 0 ? 0 : secondsLeft)
  console.log(now, end, elapsed)
  const perSecond = total / 60
  return (total - ((60 - elapsed) * perSecond)) / total
}
