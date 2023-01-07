import { Validator } from "../validators/types";

export interface FormControlProps {
  name: string;
  error?: string;
  validation?: Validator;
  validateOnChange?: boolean;
  label: string;
  labelClass?: string;
}
