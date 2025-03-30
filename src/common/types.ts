import type { Field, FieldError } from "./constants";

export interface Param {
    type?: string;
    ref?: string;       // reference field
    section?: string;   // reference section
}

export type FieldValue = string | number | boolean | Date | undefined | null;

export type FieldParamType = Param | FieldValue;

export type FieldParam = [string, FieldParamType];

export interface CustomComponentProps {
    name: string;
    field: Field;
    error: FieldError;
    value: string;
    onChange: (value?: string) => void;
    getFieldValue?: (section: string, fieldName: string) => Exclude<FieldValue, Date>;
};
