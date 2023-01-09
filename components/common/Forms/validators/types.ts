export type Validator = (value: string) => string;

export type ValidatorBuilder = (
  message: string,
  ...args: Array<any>
) => Validator;
