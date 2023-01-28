import classNames from "classnames/bind";

import { ErrorPopup } from "./ErrorPopup/ErrorPopup";
import { FormControlProps } from "./types";
import { useFormControl } from "./useFormsControl";

import { useFormErrorsContext } from "../FormProvider";

import styles from "./controls.module.scss";

const cx = classNames.bind(styles);

export interface InputProps
  extends Omit<React.ComponentPropsWithRef<"input">, "name">,
    FormControlProps {
  inputClass?: string;
}

export const Input = ({
  name,
  label,
  inputClass,
  labelClass,
  validation,
  validateOnChange,
  ...inputProps
}: InputProps) => {
  const { handleChange, handleBlur } = useFormControl<HTMLInputElement>(
    name,
    validation,
    validateOnChange
  );
  const errors = useFormErrorsContext();

  return (
    <div className={styles.controlGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cx(inputClass, { error: errors[name] })}
        {...inputProps}
      />
      <ErrorPopup message={errors[name]} />
    </div>
  );
};
