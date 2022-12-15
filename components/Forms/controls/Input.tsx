import { FormControlProps } from "./types";
import { useFormControl } from "./useFormsControl";

interface InputProps extends Omit<React.ComponentPropsWithRef<"input">, 'name'>, FormControlProps {
    inputClass?: string;
}

export const Input = ({ name, label, inputClass, labelClass, validation, ...inputProps }: InputProps) => {
  const { handleChange, handleBlur } = useFormControl(name, validation);

    return (
      <label className={labelClass}>
          <span>{label}</span>
          <input
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass}
            {...inputProps}
          />
      </label>
    );
}