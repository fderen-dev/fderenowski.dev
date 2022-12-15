import ReactTextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";

import { FormControlProps } from "./types";
import { useFormControl } from "./useFormsControl";

interface TextAreaProps extends Omit<TextareaAutosizeProps, 'name'>, FormControlProps {
  textAreaClass?: string;
};

export const TextArea = ({
  name,
  label,
  textAreaClass,
  labelClass,
  validation,
  ...textAreaProps
}: TextAreaProps) => {
  const { handleChange, handleBlur } = useFormControl(name, validation);

  return (
    <label className={labelClass}>
      <span>{label}</span>
      <ReactTextareaAutosize
        name={name}
        onChange={(event) =>
          handleChange(event as unknown as React.ChangeEvent<HTMLInputElement>)
        }
        onBlur={(event) =>
          handleBlur(event as unknown as React.FocusEvent<HTMLInputElement>)
        }
        {...textAreaProps}
      />
    </label>
  );
}