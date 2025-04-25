
export const getDaysInMonth = (year: number, month: number): string[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return day < 10 ? `0${day}` : `${day}`;
    });
  };
  
  export const isWeekend = (year: number, month: number, day: number): boolean => {
    const date = new Date(year, month, day);
    const weekday = date.getDay();
    return weekday === 0 || weekday === 6;
  };