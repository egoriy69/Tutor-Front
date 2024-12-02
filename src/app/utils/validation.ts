
export const existValidation = (field: string | number | null | undefined, message: string) => {
  const errors = [];
  if (!field) {
    errors.push({ message: message });
  }
  return errors;
}

export const regexValidation = (
  field: string | number | null | undefined,
  message: string,
  regex?: RegExp
) => {
  const errors = [];

  // Проверка на существование значения
  if (!field) {
    errors.push({ message });
  }

  // Проверка на соответствие регулярному выражению, если оно передано
  if (regex && typeof field === 'string' && !regex.test(field)) {
    errors.push({ message: message });
  }

  return errors;
};

