export type Validator = (value: string) => Array<string>;
export type ValidatorBuilder = (
  message: string,
  ...args: Array<any>
) => Validator;
