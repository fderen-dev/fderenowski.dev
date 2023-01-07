import styles from './errorPopup.module.scss';

interface ErrorPopupProps {
  message: string;
}

export const ErrorPopup = ({ message }: ErrorPopupProps) => {

  return (
    <div className={styles.errorPopup}>
      <p className={styles.errorMessage}>
        {message}
      </p>
    </div>
  );
}