import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";
import isEmpty from "lodash/isEmpty";

import { FormControlProps } from "./controls/types";

import styles from "./form.module.scss";

const methodNotImplementedError = new Error("Method not implemented");

export type FormStructure = Record<string, string>;

interface FormApi<S> {
  setValue: (name: keyof S, value: string) => void;
  setError: (name: keyof S, error: string) => void;
  clearError: (name: keyof S) => void;
  clear: () => void;
}

interface FormErrors<S> {
  errors: S;
  hasErrors: boolean;
}

const FormValuesContext = createContext<FormStructure>({});
const FormErrorsContext = createContext<FormErrors<FormStructure>>({
  errors: {},
  hasErrors: false,
});
const FormApiContext = createContext<FormApi<FormStructure>>({
  setValue(name: string, value: string) {
    throw methodNotImplementedError;
  },
  setError(name: string, error: string) {
    throw methodNotImplementedError;
  },
  clearError(name: string) {
    throw methodNotImplementedError;
  },
  clear() {
    throw methodNotImplementedError;
  },
});

interface FormProps<F extends FormStructure> {
  onSubmit: (values: F, event: React.FormEvent) => void;
  children:
    | React.ReactElement<FormControlProps>
    | Array<React.ReactElement<FormControlProps>>;
  className?: string;
}

export const Form = <F extends FormStructure>({
  onSubmit,
  children,
  className,
}: FormProps<F>) => {
  const [values, setValues] = useState<F>({} as F);
  const [errors, setErrors] = useState<FormErrors<F>>({
    hasErrors: false,
    errors: {} as F,
  });

  const setValue = useCallback((name: keyof F, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setError = useCallback((name: keyof F, error: string) => {
    setErrors((prev) => ({
      errors: { ...prev.errors, [name]: error },
      hasErrors: true,
    }));
  }, []);

  const clearError = useCallback((name: keyof F) => {
    setErrors((prev) => {
      const newState = structuredClone(prev);

      if (newState.errors.hasOwnProperty(name)) {
        delete newState.errors[name];
      }

      newState.hasErrors = !isEmpty(newState.errors);

      return newState;
    });
  }, []);

  const clear = useCallback(() => {
    setValues((prev) => {
      const newValues = structuredClone(prev);
      Object.keys(newValues).forEach((name: keyof F) => {
        // @ts-ignore
        newValues[name] = "";
      });

      return newValues;
    });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(values, event);
  };

  const api = useMemo(
    () => ({
      setValue,
      setError,
      clearError,
      clear,
    }),
    [setValue, setError, clearError, clear]
  );

  return (
    <FormApiContext.Provider value={api}>
      <FormValuesContext.Provider value={values}>
        <FormErrorsContext.Provider value={errors}>
          <form
            className={classNames(styles.form, className)}
            onSubmit={handleSubmit}
          >
            {children}
          </form>
        </FormErrorsContext.Provider>
      </FormValuesContext.Provider>
    </FormApiContext.Provider>
  );
};

export const useFormApiContext = () => useContext(FormApiContext);
export const useFormValuesContext = () => useContext(FormValuesContext);
export const useFormErrorsContext = () => useContext(FormErrorsContext);
