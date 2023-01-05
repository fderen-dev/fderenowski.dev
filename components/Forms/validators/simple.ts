import { TypeTools } from 'utils/TypeTools';

import { Validator, ValidatorBuilder } from './types';


export const isEmptyBuilder: ValidatorBuilder = (message: string) => (value: string) => 
  TypeTools.isNotEmtpyString(value) ? [] : [message];

export const minLengthBuilder: ValidatorBuilder =
  (message: string, length: number): Validator =>
  (value: string) =>
    value.trim().length >= length ? [] : [message];