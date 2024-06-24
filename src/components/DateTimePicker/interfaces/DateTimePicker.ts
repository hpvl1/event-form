export interface DateTimePickerProps {
  field: {
    value: string;
    onChange?: (value: string) => void;
  };
  label?: string;
  errors?: Object;
  fieldInput?: string;
}
