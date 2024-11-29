import type { AxiosError } from "axios";

export const inputError = (error: AxiosError, inputField: {error:{message:string}}) => {
  type ErrorResponse = {
    error: string | undefined
  }
  const data = error.response?.data as ErrorResponse
  if (data.error && typeof (data.error) === 'string') {
   inputField.error = {
      message: data.error,
    };
  } else {
    inputField.error = {
      message: 'Что-то пошло не так',
    };
  }
}
