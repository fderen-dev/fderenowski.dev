import classNames from "classnames";

import { FormControlProps } from "./controls/types";
import { useFormValuesContext } from "./FormProvider";

import styles from "./form.module.scss";

export type FormStructure = Record<string, string>;

interface FormProps {
  onSubmit: <S extends FormStructure>(
    values: S,
    event?: React.FormEvent
  ) => void;
  children:
    | React.ReactElement<FormControlProps>
    | Array<React.ReactElement<FormControlProps>>;
  className?: string;
}

export const Form = ({ onSubmit, children, className }: FormProps) => {
  const values = useFormValuesContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(values, event);
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
