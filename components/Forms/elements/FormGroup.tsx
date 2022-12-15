import classNames from "classnames";

import { WithChildren } from "utils/types";

import styles from '../form.module.scss';

interface FormGroupProps extends WithChildren {
  className?: string;
}

export const FormGroup = ({ children, className }: FormGroupProps) => (
  <div className={classNames(styles.formGroup, className)}>
    {children}
  </div>
)