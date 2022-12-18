import { FormControlValidation } from "./types";

import { useFormApiContext } from "../Form";

export const useFormControl = <InputElement extends HTMLInputElement | HTMLTextAreaElement>(name: string, validation?: FormControlValidation) => {
    const { setValue, setError } = useFormApiContext();
    
    const handleChange = (event: React.ChangeEvent<InputElement>): void => {
      setValue(name, event.target.value);
    };

    const handleBlur = (event: React.FocusEvent<InputElement>) => {
      if (validation) {
        const errorMessage = validation(event.target.value);

        if (errorMessage) {
          setError(name, errorMessage);
        }
      }
    };

    return {
      handleChange,
      handleBlur
    }
}