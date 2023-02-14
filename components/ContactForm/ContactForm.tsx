import React, { useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";

import Forms, { FormStructure } from "components/common/Forms";
import { useFormStateContext } from "components/common/Forms/FormProvider";
import {
  isEmailBuilder,
  isEmptyBuilder,
  maxLengthBuilder,
  minLengthBuilder,
} from "components/common/Forms/validators/simple";
import { composeValidators } from "components/common/Forms/validators/utils";

import { SubmitButton, SubmitButtonApi } from "./SubmitButton/SubmitButton";

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
  formData: Content.FormDocumentData;
}

export const ContactForm = ({ formData }: ContactFormProps) => {
  const { submitlabel: submitLabel, slices } = formData;

  const abortControllerRef = useRef<AbortController | null>(null);
  const submitButtonApiRef = useRef<SubmitButtonApi | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { hasErrors, hasValues } = useFormStateContext();

  const isDisabled = hasErrors || !hasValues;

  // TODO: proper typing
  const handleSubmit = async (values: any): Promise<void> => {
    if (isDisabled) {
      return;
    }

    abortControllerRef.current = new AbortController();

    setIsSubmitting(true);

    try {
      const response = await fetch(
        process.env.NEXT_STATIC_FORMSPREE_URL ?? "",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            Accept: "application/json",
          },
          signal: abortControllerRef.current.signal,
        }
      );

      if (response.ok) {
        submitButtonApiRef.current?.setOk();
      } else {
        console.error(`Submittion problem, ${response.status}`);
        submitButtonApiRef.current?.setError();
      }
    } catch (error) {
      console.error(error);
      submitButtonApiRef.current?.setError();
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, []);

  return (
    <Forms.Form validateOnSubmit onSubmit={handleSubmit}>
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
      <SubmitButton
        text={submitLabel ?? "Submit"}
        loading={isSubmitting}
        disabled={isDisabled}
        ref={submitButtonApiRef}
      />
    </Forms.Form>
  );
};
