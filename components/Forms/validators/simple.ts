import { TypeTools } from 'utils/TypeTools';

import { Validator, ValidatorBuilder } from './types';

export const isEmptyBuilder: ValidatorBuilder = (message: string): Validator => (value: string) =>
  TypeTools.isNonEmptyString(value) ? '' : message;

export const minLengthBuilder: ValidatorBuilder =
  (message: string, length: number): Validator =>
  (value: string) =>
    TypeTools.isNonEmptyString(value) && value.trim().length >= length
      ? ""
      : message;