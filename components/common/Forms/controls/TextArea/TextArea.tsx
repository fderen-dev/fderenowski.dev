import { useRef } from "react";
import classNames from "classnames/bind";
import ReactTextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

import { TypeTools } from "utils/TypeTools";

import { useFormErrorsContext } from "../../FormProvider";
import { ErrorPopup } from "../ErrorPopup/ErrorPopup";
import { FormControlProps } from "../types";
import { useFormControl } from "../useFormsControl";

import controlsStyles from "../controls.module.scss";
import styles from "./textArea.module.scss";

const cx = classNames.bind({
  ...styles,
  ...controlsStyles,
});

interface MaxLengthIndicatorProps {
  textAreaElement: HTMLTextAreaElement | null;
  maxLength: number;
}

const MaxLengthIndicator = ({
  textAreaElement,
  maxLength,
}: MaxLengthIndicatorProps) => {
  const length = textAreaElement?.value?.length ?? 0;

  return (
    <p className={styles.maxLengthIndicator}>{`${length}/${maxLength}`}</p>
  );
};

interface InputProps extends Omit<TextAreaProps, "label" | "labelClass"> {
  hasError: boolean;
  children: React.ReactNode;
}

const Input = ({
  name,
  textAreaClass,
  validation,
  validateOnChange,
  maxLength,
  hasError,
  children,
  ...textAreaProps
}: InputProps) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { handleChange, handleBlur } = useFormControl<HTMLTextAreaElement>(
    name,
    validation,
    validateOnChange
  );
  const showMaxLengthIndicator = !TypeTools.isNullOrUndefined(maxLength);

  return (
    <>
      <div className={styles.container}>
        <ReactTextareaAutosize
          id={name}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cx(textAreaClass, { error: hasError })}
          ref={inputRef}
          {...textAreaProps}
        />
        {children}
      </div>
      {showMaxLengthIndicator && (
        <MaxLengthIndicator
          textAreaElement={inputRef.current}
          maxLength={maxLength!}
        />
      )}
    </>
  );
};

interface TextAreaProps
  extends Omit<TextareaAutosizeProps, "name">,
    FormControlProps {
  textAreaClass?: string;
}

export const TextArea = ({
  name,
  label,
  labelClass,
  ...textAreaProps
}: TextAreaProps) => {
  const errors = useFormErrorsContext();
  const hasError = Boolean(errors[name]);

  return (
    <div className={styles.controlGroup}>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <Input name={name} hasError={hasError} {...textAreaProps}>
        {hasError && (
          <ErrorPopup message={errors[name]} popupClass={styles.errorPopup} />
        )}
      </Input>
    </div>
  );
};
