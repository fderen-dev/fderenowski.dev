import { FormControlValidation } from "./types";

import { useFormApiContext } from "../Form";

export const useFormControl = (name: string, validation?: FormControlValidation) => {
    const { setValue, setError } = useFormApiContext();
    
    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ): void => {
      setValue(name, event.target.value);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
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