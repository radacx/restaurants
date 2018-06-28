const blockToHoursRatio = 2;

const blockToHours = (block: number): number => block * blockToHoursRatio;

export const hourToString = (hour: number): string =>
  `${hour < 10 ? '0' : ''}${hour}:00`;

export const stringToHours = (hourString: string): number => {
  const hourMatch = /(\d+):00/.exec(hourString);

  return hourMatch
    ? +hourMatch[1]
    : 0;
};

export const blockToTimeRangeString = (block: number): string => {
  const startingHour = blockToHours(block);
  const endingHour = startingHour + blockToHoursRatio;

  const timeFrom = hourToString(startingHour);
  const timeTo = hourToString(endingHour);

  return `${timeFrom} - ${timeTo}`;
};

export const dateToString = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;