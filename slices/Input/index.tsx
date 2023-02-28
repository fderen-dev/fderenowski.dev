import { Content } from "@prismicio/client";
import { SliceComponentProps, SliceComponentType } from "@prismicio/react";
import { noop } from "lodash";

import Forms from "components/common/Forms";
import { TextArea } from "components/common/Forms/controls/TextArea/TextArea";
import {
  isEmailBuilder,
  isEmptyBuilder,
  maxLengthBuilder,
  minLengthBuilder,
} from "components/common/Forms/validators/simple";
import { composeValidators } from "components/common/Forms/validators/utils";

import { TypeTools } from "utils/TypeTools";

const TextInput: SliceComponentType = (
  props: SliceComponentProps<Content.TextInputSlice>
) => {
  const {
    slice: {
      variation,
      primary: {
        name,
        label,
        placeholder,
        required,
        requiredvalidationmessage,
        // @ts-ignore
        minlength,
        // @ts-ignore
        minlengthvalidationmessage,
        // @ts-ignore
        maxlength,
        // @ts-ignore
        maxlengthvalidationmessage,
        // @ts-ignore
        emailvalidationmessage,
      },
    },
  } = props;

  if (TypeTools.isNullOrUndefined(name) || TypeTools.isNullOrUndefined(label)) {
    return null;
  }

  const requiredValidator =
    required && TypeTools.isNonEmptyString(requiredvalidationmessage)
      ? isEmptyBuilder(requiredvalidationmessage as string)
      : (noop as any);
  const minLengthValidator =
    !TypeTools.isNullOrUndefined(minlength) &&
    TypeTools.isNonEmptyString(minlengthvalidationmessage)
      ? minLengthBuilder(minlengthvalidationmessage, minlength)
      : (noop as any);
  const maxLengthValidator =
    !TypeTools.isNullOrUndefined(maxlength) &&
    TypeTools.isNonEmptyString(maxlengthvalidationmessage)
      ? maxLengthBuilder(maxlengthvalidationmessage, maxlength)
      : (noop as any);
  const emailValidator = TypeTools.isNonEmptyString(emailvalidationmessage)
    ? isEmailBuilder(emailvalidationmessage)
    : (noop as any);

  const validator = composeValidators([
    requiredValidator,
    minLengthValidator,
    maxLengthValidator,
    emailValidator,
  ]);

  switch (variation) {
    case "default":
      return (
        <Forms.Input
          validateOnChange
          name={name!}
          label={label!}
          placeholder={placeholder ?? undefined}
          minLength={minlength ?? undefined}
          maxLength={maxlength ?? undefined}
          validation={validator}
        />
      );

    case "email":
      return (
        <Forms.Input
          validateOnChange
          type="email"
          name={name!}
          label={label!}
          placeholder={placeholder ?? undefined}
          validation={validator}
        />
      );

    case "textArea":
      return (
        <Forms.TextArea
          validateOnChange
          name={name!}
          label={label!}
          placeholder={placeholder ?? undefined}
          validation={validator}
          minRows={5}
          maxRows={8}
          maxLength={maxlength ?? undefined}
          minLength={minlength ?? undefined}
        />
      );

    default:
      return null;
  }
};

export default TextInput;
