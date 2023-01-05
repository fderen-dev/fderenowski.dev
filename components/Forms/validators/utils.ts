import flow from "lodash/flow";

import { TypeTools } from "utils/TypeTools";

import { Validator } from "./types";

export const composeValidators = (validators: Array<Validator>): Validator =>
  flow(...validators);

export const joinErrorMessages = (messages: Array<string>, delimiter?: '\n'): string | null => TypeTools.isNonEmptyArray(messages) ? messages.join(delimiter) : null;