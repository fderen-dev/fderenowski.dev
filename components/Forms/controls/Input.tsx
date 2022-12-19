import classNames from "classnames/bind";

import { FormControlProps } from "./types";
import { useFormControl } from "./useFormsControl";

import { useFormErrorsContext } from "../Form";

import styles from './controls.module.scss';

const cx = classNames.bind(styles);

interface InputProps extends Omit<React.ComponentPropsWithRef<"input">, 'name'>, FormControlProps {
    inputClass?: string;
}

export const Input = ({ name, label, inputClass, labelClass, validation, ...inputProps }: InputProps) => {
  const { handleChange, handleBlur } = useFormControl<HTMLInputElement>(name, validation);
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
        {errors[name] && <span className={styles.errorMessage}>{errors[name]}</span>}
      </div>
    );
}