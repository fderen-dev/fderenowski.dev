export class TypeTools {
  static isNullOrUndefined(value: unknown): boolean {
    return value === undefined || value === null;
  }

  static isString(value: unknown): boolean {
    return typeof value === "string";
  }

  static isNonEmptyString(value: unknown): boolean {
    return this.isString(value) && (value as string).trim().length > 0;
  }

  static isNonEmptyArray(value: unknown): boolean {
    return Array.isArray(value) && value.length > 0;
  }
}