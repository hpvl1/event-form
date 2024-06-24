import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers/";

import { ruRU } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/ru";

import { DateTimePickerProps } from "./interfaces/DateTimePicker";

const DateTimePick = ({
  field,
  label,
  errors,
  fieldInput,
}: DateTimePickerProps) => {
  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ru"
        localeText={ruRU}
      >
        <DateTimePicker
          label={label}
          value={field.value ?? undefined}
          onChange={(e) => field.onChange(e)}
          slotProps={{
            textField: {
              error: !!errors[fieldInput]?.message,
              helperText: errors[fieldInput]?.message,
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateTimePick;
