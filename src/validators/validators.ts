import { REQUIRED_FIELD } from "../constants/validators";

export const eventNameValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.length < 3) {
      return "Меньше 3 символов!";
    }

    if (value.length > 50) {
      return "Больше 50 символов!";
    }

    return true;
  },
};

export const datePickerValidation = {
  required: REQUIRED_FIELD,
};
