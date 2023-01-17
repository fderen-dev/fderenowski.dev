import classNames from "classnames/bind";

import { Spinner } from "components/common/Spinner/Spinner";

import styles from "./button.module.scss";

type Variant = "primary" | "secondary";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  loading?: boolean;
  children: React.ReactNode;
}

const cx = classNames.bind(styles);

export const Button = ({
  onClick,
  variant = "primary",
  loading,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={loading ? undefined : onClick}
      disabled={isDisabled}
      className={cx(styles.button, variant, className)}
      {...props}
    >
      {loading ? (
        <Spinner size="small" className={styles.loadingSpinner} />
      ) : (
        children
      )}
    </button>
  );
};
