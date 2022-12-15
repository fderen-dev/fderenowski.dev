export type FormControlValidation = (value: string) => string | null;

export interface FormControlProps {
  name: string;
  error?: string;
  validation?: FormControlValidation;
  label: string;
  labelClass?: string;
}
