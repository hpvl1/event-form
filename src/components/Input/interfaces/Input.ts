export interface InputProps {
  fullWidth?: boolean;
  size?: string;
  label?: string;
  field: {
    value: string;
    onChange?: (value: string) => void;
  };
  fieldInput?: string;
  errors?: Object;
}
