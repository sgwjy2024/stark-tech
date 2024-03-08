export function getLastYearStartAndEnd(n_years: string) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const lastYearStart = new Date(currentYear - parseInt(n_years), currentMonth, currentDay);
  const lastYearEnd = new Date(currentYear, currentMonth, currentDay);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };
  return {
    startTime: formatDate(lastYearStart),
    endTime: formatDate(lastYearEnd),
  };
}
