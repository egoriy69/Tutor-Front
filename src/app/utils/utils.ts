export const formatUTC = (UTCDate: Date) => {
  if (UTCDate) {
    return new Date(UTCDate).toLocaleString([], {
      year: 'numeric', month: 'numeric',
      day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

}

