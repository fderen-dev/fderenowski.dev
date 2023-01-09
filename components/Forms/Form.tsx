import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";
import isEmpty from "lodash/isEmpty";

import { TypeTools } from "utils/TypeTools";

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

interface FormState {
  hasValues: boolean;
  hasErrors: boolean;
}

const FormValuesContext = createContext<FormStructure>({});
const FormErrorsContext = createContext<FormStructure>({});
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
const FormStateContext = createContext<FormState>({
  hasValues: false,
  hasErrors: false,
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
  const [errors, setErrors] = useState<F>({} as F);
  const [state, setState] = useState<FormState>({
    hasValues: false,
    hasErrors: false,
  });

  const setValue = useCallback((name: keyof F, value: string) => {
    let hasValues = false;

    setValues((prev) => {
      const newValues = { ...prev, [name]: value };

      hasValues = Object.values(newValues).some((value) =>
        TypeTools.isNonEmptyString(value)
      );

      return newValues;
    });

    setState((prev) => ({
      ...prev,
      hasValues,
    }));
  }, []);

  const setError = useCallback((name: keyof F, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    setState((prev) => ({
      ...prev,
      hasErrors: true,
    }));
  }, []);

  const clearError = useCallback((name: keyof F) => {
    let hasErrors = false;

    setErrors((prev) => {
      const newState = structuredClone(prev);

      if (newState.hasOwnProperty(name)) {
        delete newState[name];
      }

      hasErrors = !isEmpty(newState);

      return newState;
    });

    setState((prev) => ({
      ...prev,
      hasErrors,
    }));
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

    setState((prev) => ({
      ...prev,
      hasValues: false,
    }));
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
          <FormStateContext.Provider value={state}>
            <form
              className={classNames(styles.form, className)}
              onSubmit={handleSubmit}
            >
              {children}
            </form>
          </FormStateContext.Provider>
        </FormErrorsContext.Provider>
      </FormValuesContext.Provider>
    </FormApiContext.Provider>
  );
};

export const useFormApiContext = () => useContext(FormApiContext);
export const useFormValuesContext = () => useContext(FormValuesContext);
export const useFormErrorsContext = () => useContext(FormErrorsContext);
export const useFormStateContext = () => useContext(FormStateContext);
