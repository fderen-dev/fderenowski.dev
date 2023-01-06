import { useFormApiContext } from "../Form";
import { Validator } from "../validators/types";

export const useFormControl = <InputElement extends HTMLInputElement | HTMLTextAreaElement>(name: string, validation?: Validator) => {
    const { setValue, setError, clearError } = useFormApiContext();
    
    const handleChange = (event: React.ChangeEvent<InputElement>): void => {
      setValue(name, event.target.value);
    };

    const handleBlur = (event: React.FocusEvent<InputElement>): void => {
      if (validation) {
        const errorMessage = validation(event.target.value);

        if (errorMessage) {
          setError(name, errorMessage);
        } else {
          clearError(name);
        }
      }
    };

    return {
      handleChange,
      handleBlur
    }
}