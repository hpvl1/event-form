import { useState } from "react";
import { Select, MenuItem } from "@mui/material/";
import Checkbox from "@mui/material/Checkbox";

import FormHelperText from "@mui/material/FormHelperText";

import { SelectProps } from "./interfaces/Select";

const SelectComp = ({
  field,
  options,
  label,
  required = false,
  multiple = false,
  withCheckbox = false,
}: SelectProps) => {
  const [selectedVal, setSelectedVal] = useState([]);


  return (
    <>
      <Select
        value={field.value ?? ""}
        required={required}
        fullWidth
        multiple={multiple}
        onChange={(e) => field.onChange(e)}
      >
        {options.map((item) => {
          return (
            <MenuItem key={item.id} value={withCheckbox ? item.id : item.title}>
              {withCheckbox && (
                <Checkbox checked={field.value.includes(item.id)} />
              )}
              {withCheckbox ? item.name : item.title}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{label}</FormHelperText>
    </>
  );
};

export default SelectComp;
