import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import classNames from 'classnames';

import { FormControlProps } from './controls/types';

import styles from './form.module.scss';

const methodNotImplementedError = new Error("Method not implemented");

export type FormStructure = Record<string, string>;

interface FormApi<FormStructure> {
    setValue: (name: keyof FormStructure, value: string) => void,
    setError: (name: keyof FormStructure, error: string) => void,
    clear: () => void,
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
    clear() {
        throw methodNotImplementedError;
    },
});

interface FormProps<F extends FormStructure> {
    onSubmit: (values: F, event: React.FormEvent) => void;
    children: React.ReactElement<FormControlProps> | Array<React.ReactElement<FormControlProps>>;
    className?: string;
}

export const Form = <F extends FormStructure>({
  onSubmit,
  children,
  className,
}: FormProps<F>) => {
  const [values, setValues] = useState<F>({} as F);
  const [errors, setErrors] = useState<F>({} as F);

  const setValue = useCallback((name: keyof F, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setError = useCallback((name: keyof F, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
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
      clear,
    }),
    [setValue, setError, clear]
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