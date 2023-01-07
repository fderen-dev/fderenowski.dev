import classNames from "classnames/bind";
import ReactTextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";

import { ErrorPopup } from "./ErrorPopup";
import { FormControlProps } from "./types";
import { useFormControl } from "./useFormsControl";

import { useFormErrorsContext } from "../Form";

import styles from './controls.module.scss';

const cx = classNames.bind(styles);

interface TextAreaProps extends Omit<TextareaAutosizeProps, 'name'>, FormControlProps {
  textAreaClass?: string;
};

export const TextArea = ({
  name,
  label,
  textAreaClass,
  labelClass,
  validation,
  validateOnChange,
  ...textAreaProps
}: TextAreaProps) => {
  const { handleChange, handleBlur } = useFormControl<HTMLTextAreaElement>(
    name,
    validation,
    validateOnChange
  );
    const errors = useFormErrorsContext();

  return (
    <div className={styles.controlGroup}>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <ReactTextareaAutosize
        id={name}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cx(textAreaClass, { error: errors[name] })}
        {...textAreaProps}
      />
      {errors[name] && <ErrorPopup message={errors[name]} />}
    </div>
  );
}