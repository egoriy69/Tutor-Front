import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const formatISOToCalendarString = (ISOString:string) =>{
  return dayjs(ISOString+'Z').format('YYYY-MM-DD HH:mm')
}
export const formatCalendarStringToISO = (calendarString:string)=>{
  return dayjs.utc(calendarString).toISOString().slice(0, -1)
}
export const roundToNearest15Minutes = (dateStr:string)=> {
  const dt = dayjs(dateStr);

  // Получаем количество минут
  const minutes = dt.minute();

  // Округляем минуты до ближайших 15
  const roundedMinutes = Math.round(minutes / 15) * 15;

  // Округляем дату с новыми минутами, сбрасываем секунды и миллисекунды
  return dt
    .minute(roundedMinutes)
    .second(0)
    .millisecond(0)
    .format('YYYY-MM-DD HH:mm');
}
