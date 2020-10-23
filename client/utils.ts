// parse the date
export const parseDate = (date: Date) => {
  return new Date(date!.toString()).toLocaleString();
};
