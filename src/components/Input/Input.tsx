import { InputLabel, TextField } from "@mui/material/";

import { InputProps } from "./interfaces/Input";

// import styles from "./styles/Input.module.scss";

const Input: React.FC<InputProps> = ({
  fullWidth = false,
  size = "normal",
  label,
  field,
  fieldInput,
  errors,
}) => {
  return (
    <>
      <TextField
        label={label}
        onChange={(e) => field.onChange(e)}
        value={field.value}
        error={!!errors[fieldInput]?.message}
        helperText={errors[fieldInput]?.message}
        fullWidth={fullWidth}
      />
    </>
  );
};

export default Input;
