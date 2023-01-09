import React, { useState } from "react";

import { Button } from "components/common/Button/Button";
import Forms, { FormStructure } from "components/common/Forms";
import { useFormStateContext } from "components/common/Forms/FormProvider";
import {
  isEmailBuilder,
  isEmptyBuilder,
  maxLengthBuilder,
  minLengthBuilder,
} from "components/common/Forms/validators/simple";
import { composeValidators } from "components/common/Forms/validators/utils";

const nameValidator = composeValidators([
  isEmptyBuilder("Name cannot be empty."),
  minLengthBuilder("Name has to have at least 3 characters.", 3),
]);
const emailValidator = composeValidators([
  isEmptyBuilder("E-mail is requried."),
  isEmailBuilder("It seems not to be an e-mail address."),
]);
const messageValidator = composeValidators([
  isEmptyBuilder("Don't leave empty message :("),
  maxLengthBuilder("Message can have max 500 characters", 500),
]);

export interface ContactFormStructure extends FormStructure {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (values: ContactFormStructure) => Promise<void>;
}

export const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { hasErrors, hasValues } = useFormStateContext();

  const isDisabled = hasErrors || !hasValues;

  // TODO: proper typing
  const handleSubmit = async (values: any): Promise<void> => {
    if (isDisabled) {
      return;
    }

    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  };

  return (
    <Forms.Form onSubmit={handleSubmit}>
      <Forms.FormGroup>
        <Forms.Input
          validateOnChange
          validation={nameValidator}
          name="name"
          label="Name"
          placeholder="What's your name?"
        />
        <Forms.Input
          validateOnChange
          validation={emailValidator}
          type="email"
          name="email"
          label="E-mail"
          placeholder="Type your email so I could get back to you"
        />
      </Forms.FormGroup>
      <Forms.TextArea
        validateOnChange
        validation={messageValidator}
        minRows={5}
        maxRows={8}
        maxLength={500}
        name="message"
        label="Message"
        placeholder="What's on your mind?"
      />
      <Button type="submit" loading={isSubmitting} disabled={isDisabled}>
        Send!
      </Button>
    </Forms.Form>
  );
};
