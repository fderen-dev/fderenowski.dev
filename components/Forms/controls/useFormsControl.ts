import { useFormApiContext } from "../Form";
import { Validator } from "../validators/types";

export const useFormControl = <InputElement extends HTMLInputElement | HTMLTextAreaElement>(name: string, validation?: Validator, validateOnChange?: boolean) => {
    const { setValue, setError, clearError } = useFormApiContext();

    const validate = (value: string) => {
      const errorMessage = validation?.(value);

      if (errorMessage) {
        setError(name, errorMessage);
      } else {
        clearError(name);
      }
    };
    
    const handleChange = (event: React.ChangeEvent<InputElement>): void => {
      setValue(name, event.target.value);

      if (validation && validateOnChange) {
        validate(event.target.value);
      }
    };

    const handleBlur = (event: React.FocusEvent<InputElement>): void => {
      if (validation && !validateOnChange) {
        validate(event.target.value);
      }
    };

    return {
      handleChange,
      handleBlur
    }
}