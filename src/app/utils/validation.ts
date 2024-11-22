
export const existValidation = (field: string | number | null | undefined, message: string) => {
  const errors = [];
  if (!field) {
    errors.push({ message: message });
  }
  return errors;
}
