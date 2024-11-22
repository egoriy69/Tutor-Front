
export const passwordLoginValidation = (password: string | undefined) => {
  const errors = [];
  if (!password) {
    errors.push({ message: "Введите пароль" });
  }
  //  else if (password.length < 8) {
  //   errors.push({ message: "Пароль должен содержать минимум 8 символов" });
  // } else if (!/[A-Z]/.test(password)) {
  //   errors.push({ message: "Пароль должен содержать хотя бы одну заглавную букву" });
  // } else if (!/[a-z]/.test(password)) {
  //   errors.push({ message: "Пароль должен содержать хотя бы одну строчную букву" });
  // }
  return errors;
};
export const passwordRegValidation = (password: string | undefined) => {
  const errors = [];
  if (!password) {
    errors.push({ message: "Введите пароль" });
  }
  //  else if (password.length < 8) {
  //   errors.push({ message: "Пароль должен содержать минимум 8 символов" });
  // } else if (!/[A-Z]/.test(password)) {
  //   errors.push({ message: "Пароль должен содержать хотя бы одну заглавную букву" });
  // } else if (!/[a-z]/.test(password)) {
  //   errors.push({ message: "Пароль должен содержать хотя бы одну строчную букву" });
  // }
  return errors;
};
export const confirmPasswordRegValidation = (password: string | undefined, confirmPassword: string | undefined) => {
  const errors = [];
  if (!confirmPassword) {
    errors.push({ message: "Подтвердите пароль" });
  }
  if (confirmPassword!==password) {
    errors.push({ message: "Пароли не совпадают" });
  }

  return errors;
};
