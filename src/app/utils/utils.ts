export const formatUTC = (UTCDate: Date) => {
  if (UTCDate) {
    return new Date(UTCDate).toLocaleString([], {
      year: 'numeric', month: 'numeric',
      day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }
}
export const formatToLocalDate = (date:Date)=>{
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

