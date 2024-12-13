

export const rangeValidation = (startTime: string | undefined, endTime: string | undefined, message: string, optional?: boolean) => {
  const errors = [];
  if (!startTime || !endTime || optional) {
    errors.push({ message: message });
    return errors
  }

  if (startTime>=endTime) {
    errors.push({ message });
  }

  return errors;

}
