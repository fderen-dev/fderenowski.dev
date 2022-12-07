export interface FormControlProps {
  name: string;
  error: string;
  validation?: (value: string) => string | null;
}
