import { TypeTools } from "utils/TypeTools";

import { Validator, ValidatorBuilder } from "./types";

export const isEmptyBuilder: ValidatorBuilder =
  (message: string): Validator =>
  (value: string) =>
    TypeTools.isNonEmptyString(value) ? "" : message;

export const minLengthBuilder: ValidatorBuilder =
  (message: string, length: number): Validator =>
  (value: string) =>
    TypeTools.isNullOrUndefined(value)
      ? ""
      : value.trim().length >= length
      ? ""
      : message;

export const maxLengthBuilder: ValidatorBuilder =
  (message: string, length: number): Validator =>
  (value: string) =>
    TypeTools.isNullOrUndefined(value)
      ? ""
      : value.trim().length <= length
      ? ""
      : message;

const emailRegexp = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const isEmailBuilder: ValidatorBuilder =
  (message: string) => (value: string) =>
    emailRegexp.test(value) ? "" : message;
