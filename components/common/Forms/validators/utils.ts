import { TypeTools } from "utils/TypeTools";

import { Validator } from "./types";

export const composeValidators = (
  validators: Array<Validator>,
  delimiter = "\n"
): Validator => {
  return function runValidatorsAndJoinMessages(value: string): string {
    const messages: Array<string> = [];

    validators.forEach((validator) => {
      const message = validator(value);

      if (TypeTools.isNonEmptyString(message)) {
        messages.push(message);
      }
    });

    return messages.join(delimiter);
  };
};
