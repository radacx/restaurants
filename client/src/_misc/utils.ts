const blockToHoursRatio = 2;

const blockToHours = (block: number): number => block * blockToHoursRatio;

const hourToString = (hour: number): string =>
  `${hour < 10 ? '0' : ''}${hour}:00`;

export const blockToTimeRangeString = (block: number): string => {
  const startingHour = blockToHours(block);
  const endingHour = startingHour + blockToHoursRatio;

  const timeFrom = hourToString(startingHour);
  const timeTo = hourToString(endingHour);

  return `${timeFrom} - ${timeTo}`;
};
