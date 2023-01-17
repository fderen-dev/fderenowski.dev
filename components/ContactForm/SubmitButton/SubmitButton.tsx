import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { Button } from "components/common/Button/Button";

import { TimeoutHandle } from "utils/types";

interface SubmitButtonProps
  extends Omit<
    React.ComponentProps<typeof Button>,
    "variant" | "type" | "children"
  > {
  text: string;
  statusTimeoutMs?: number;
}

export interface SubmitButtonApi {
  setOk: () => void;
  setError: () => void;
}

enum StatusFlag {
  Ok = "Ok",
  Error = "Error",
}

export const SubmitButton = forwardRef<SubmitButtonApi, SubmitButtonProps>(
  function SubmitProps(props, ref) {
    const [statusFlag, setStatusFlag] = useState<StatusFlag | null>(null);
    const timeoutRef = useRef<TimeoutHandle | null>(null);

    const { text, statusTimeoutMs = 2000, ...rest } = props;

    useImperativeHandle(
      ref,
      () => ({
        setOk: () => setStatusFlag(StatusFlag.Ok),
        setError: () => setStatusFlag(StatusFlag.Error),
      }),
      []
    );

    useEffect(() => {
      if (statusFlag) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        setTimeout(() => {
          setStatusFlag(null);
        }, statusTimeoutMs);
      }
    }, [statusFlag, statusTimeoutMs]);

    useEffect(() => {
      () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }, []);

    return (
      <Button type="submit" variant="primary" {...rest}>
        {statusFlag ?? text}
      </Button>
    );
  }
);
