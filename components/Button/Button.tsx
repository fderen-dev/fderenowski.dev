import classNames from 'classnames/bind';

import styles from './button.module.scss';

type Variant = "primary" | "secondary";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  children: React.ReactNode;
}

const cx = classNames.bind(styles);

export const Button = ({variant = "primary", children, className, ...props}: ButtonProps) => {
  return (
    <button className={cx(styles.button, variant, className)} {...props}>
      {children}
    </button>
  );
}