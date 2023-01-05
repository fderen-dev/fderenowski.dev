import { Validator } from "../validators/types";

export interface FormControlProps {
  name: string;
  error?: string;
  validation?: Validator;
  label: string;
  labelClass?: string;
}
