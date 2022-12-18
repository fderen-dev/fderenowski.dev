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
  const { handleChange, handleBlur } = useFormControl<HTMLTextAreaElement>(name, validation);

  return (
    <label className={labelClass}>
      <span>{label}</span>
      <ReactTextareaAutosize
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        {...textAreaProps}
      />
    </label>
  );
}