export interface SelectProps {
  field: {
    value?: string | [];
    onChange?: (value: string) => void;
  };
  label?: string;
  required: boolean;
  multiple?: boolean;
  withCheckbox?: boolean;
  options;
}
