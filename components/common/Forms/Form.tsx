import React, { Children as ReactChildren } from "react";
import classNames from "classnames";
import noop from "lodash/noop";

import { InputProps } from "./controls/Input";
import { TextAreaProps } from "./controls/TextArea/TextArea";
import { FormControlProps } from "./controls/types";
import { useFormApiContext, useFormValuesContext } from "./FormProvider";

import styles from "./form.module.scss";

export type FormStructure = Record<string, string>;

const validateChild = (
  child: React.ReactElement<InputProps | TextAreaProps>,
  formState: FormStructure,
  errorSetter: (name: string, error: string) => void
): boolean => {
  const { name, validation } = child.props;
  const error = validation?.(formState[name] ?? "");

  if (error) {
    errorSetter(name, error);

    return false;
  }

  return true;
};

interface FormProps {
  onSubmit: <S extends FormStructure>(
    values: S,
    event?: React.FormEvent
  ) => void;
  children:
    | React.ReactElement<FormControlProps>
    | Array<React.ReactElement<FormControlProps>>;
  validateOnSubmit?: boolean;
  className?: string;
}

export const Form = ({
  onSubmit,
  children,
  validateOnSubmit,
  className,
}: FormProps) => {
  const values = useFormValuesContext();
  const { setError } = useFormApiContext();

  const validateChildren = (children: FormProps["children"]): boolean => {
    let isValid = true;

    ReactChildren.forEach(children, (child) => {
      if (child.props?.hasOwnProperty("children")) {
        // @ts-ignore
        validateChildren(child.props.children);
      } else if (child.props?.name && child.props?.validation) {
        isValid = validateChild(child, values, setError);
      }
    });

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateOnSubmit) {
      validateChildren(children) ? onSubmit(values, event) : noop;
    } else {
      onSubmit(values, event);
    }
  };

  return (
    <form
      className={classNames(styles.form, className)}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
};
