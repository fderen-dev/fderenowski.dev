import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { Button } from "components/common/Button/Button";

import { TimeoutHandle } from "utils/types";

import ErrorIcon from "public/cancel.svg";
import OkIcon from "public/ok.svg";

import styles from "./submitButton.module.scss";

const StatusIcon = ({ status }: { status: Status }) => (
  <i className={styles.icon}>
    {status === Status.Ok ? <OkIcon /> : <ErrorIcon />}
  </i>
);

interface SubmitButtonProps
  extends Omit<
    React.ComponentProps<typeof Button>,
    "variant" | "type" | "children"
  > {
  text: string;
  statusTimeoutMs?: number;
  onStatusClear?: () => void;
}

export interface SubmitButtonApi {
  setOk: () => void;
  setError: () => void;
}

enum Status {
  Ok = "Ok",
  Error = "Error",
}

export const SubmitButton = forwardRef<SubmitButtonApi, SubmitButtonProps>(
  function SubmitProps(
    { text, statusTimeoutMs = 2000, onStatusClear, loading, disabled, ...rest },
    ref
  ) {
    const [status, setStatus] = useState<Status | null>(null);
    const timeoutRef = useRef<TimeoutHandle | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        setOk: () => setStatus(Status.Ok),
        setError: () => setStatus(Status.Error),
      }),
      []
    );

    useEffect(() => {
      if (status) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        setTimeout(() => {
          setStatus(null);
          onStatusClear?.();
        }, statusTimeoutMs);
      }
    }, [status, statusTimeoutMs, onStatusClear]);

    useEffect(() => {
      () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }, []);

    return (
      <Button
        type="submit"
        variant="primary"
        loading={loading && !status}
        disabled={disabled || Boolean(status)}
        {...rest}
        className={styles.button}
      >
        {status ? <StatusIcon status={status} /> : text}
      </Button>
    );
  }
);
