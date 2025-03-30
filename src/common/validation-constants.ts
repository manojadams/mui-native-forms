import type { FieldValue } from "./types";

export interface Operand {
    ref: string;
    section?: string;
}

export type Operator = "===" | ">=" | "<=";

export type NextCondition = "&&" | "||";

export type Condition = [Operand, Operator, Operand | FieldValue, NextCondition?];

export interface BaseFieldValidation<T> {
    value: T;
    errorMsg: string;
}

export interface PatternFieldValidation<T> extends BaseFieldValidation<T> {
    allowValidOnly?: boolean;
}

/**
 * Validation properties for field
 */
export interface FieldValidation {
    /** Marks the field as mandatory before form submission */
    required?: boolean | BaseFieldValidation<boolean>;
    /** Pattern to be used by the field -- valid for field of type text */
    pattern?: string | PatternFieldValidation<string>;
    /** Minimum value acceptable by the field */
    min?: number | string | BaseFieldValidation<number | string>;
    /** Maximum value acceptable by the field */
    max?: number | string | BaseFieldValidation<number | string>;
    info?: string | BaseFieldValidation<string>;
}
