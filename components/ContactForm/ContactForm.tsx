import React, { useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import Forms, { FormStructure } from "components/common/Forms";
import { useFormStateContext } from "components/common/Forms/FormProvider";

import { SubmitButton, SubmitButtonApi } from "./SubmitButton/SubmitButton";

import { components as slices } from "../../slices";

export interface ContactFormStructure extends FormStructure {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  prismicDocumentData: {
    form: Content.FormDocumentData;
    formGroup: Content.FormgroupDocumentData;
  };
}

export const ContactForm = ({
  prismicDocumentData: { form, formGroup },
}: ContactFormProps) => {
  const { submitlabel: submitLabel, slices: formSlicesData } = form;
  const { slices: formGroupSlicesData } = formGroup;

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
        <SliceZone slices={formGroupSlicesData} components={slices} />
      </Forms.FormGroup>
      <SliceZone slices={formSlicesData} components={slices} />
      <SubmitButton
        text={submitLabel ?? "Submit"}
        loading={isSubmitting}
        disabled={isDisabled}
        ref={submitButtonApiRef}
      />
    </Forms.Form>
  );
};
