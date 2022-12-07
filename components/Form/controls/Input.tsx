import { FormControlProps } from "./types";

import { useFormApiContext } from "../Form";

interface InputProps extends FormControlProps {
    label: string;
    inputClass?: string;
    labelClass?: string;
}

export const Input = ({ name, label, inputClass, labelClass, validation }: InputProps) => {
    const { setValue, setError } = useFormApiContext();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(name, event.target.value);
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (validation) {
            const errorMessage = validation(event.target.value);

            if (errorMessage) {
                setError(name, errorMessage);
            }
        }
    }

    <label className={labelClass}>
        <span>{label}</span>
        <input name={name} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
    </label>
}