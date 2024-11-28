import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatUTC = (UTCDate: string) => {
  if (UTCDate) {
    return new Date(UTCDate).toLocaleString([], {
      year: 'numeric', month: 'numeric',
      day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }
}
export const formatToLocalDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

export const ISOToDateNoLocale = (date: string) => {
  if (date) {
    // const utcDayJs = dayjs.utc(date);
    // return new Date(utcDayJs.year(), utcDayJs.month(), utcDayJs.date(), utcDayJs.hour(), utcDayJs.minute(), utcDayJs.second(), utcDayJs.millisecond());
    const newDate = new Date(date)
    const userTimezoneOffset = newDate.getTimezoneOffset() * 60000;
    return new Date(newDate.getTime() + userTimezoneOffset);
  } else return null
}


export const dateToJSONNoLocale = (date: Date) => {
  if (date) return dayjs(date).utc(true).toJSON()
  else return null
}


