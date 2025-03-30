import type { RequestHeaders } from "./api-constants";
import type { FieldDependency } from "./dependency-constants";
import type { ClickEvent, InputEvent, ChangeEvent } from "./events";
import type { FieldValue } from "./types";
import type { FieldValidation } from "./validation-constants";

export interface MFile {
    type: string;
    fileName: string;
    base64String: string;
}

export type FieldConfig = Record<string, string | boolean> | RequestHeaders;

export interface Meta {
    autoComplete?: string;
    /**
     * values - hidden (whether field is to be hidden)
     * value - section (whether field is a section)
     */
    type?: string;
    /** Is field to be displayed
     * @internal
     */
    display?: boolean;
    /** For future usage */
    isArray?: boolean;
    /** Display name of the field */
    displayName?: string;
    /** Display type of the field. */
    displayType?: string;
    /** Placeholder to be used in the field */
    placeholder?: string;
    /** Value of the field */
    value?: string | number | boolean;
    /** Layout properties of the field */
    displayProps?: FieldDisplayProps;
    /** Native html properties of the field */
    htmlProps?: Record<string, string>;
    /** List of options available for the field (e.g-> dropdown, select etc) */
    options?: Array<FieldOption>;
    /** Marks a field as `disabled` */
    isDisabled?: boolean;
    /** Marks as field as `readonly` */
    isReadonly?: boolean;
    /** Validation details for the field */
    validation?: FieldValidation;
    /** Field relationships/dependencies with other fields */
    dependencies?: FieldDependency;
    url?: string;
    /** Custom classname to be used for the field */
    className?: string;
    /** Events supported by the field */
    events?: FieldEvent;
    labelPlacement?: string;
    /** Validation errors with the field */
    error?: FieldError;
    /** Configuration information of the field */
    config?: FieldConfig;
    /** For icon name */
    iconName?: string;
};

export interface FieldControlProps {
    error: FieldError;
    value: string;
    onChange: (value: string) => void;
};

export interface FieldRef {
    ref?: string;
}

/**
 * Represents a dropdown option
 */
export interface FieldOption {
    value: FieldValue;
    label: string;
    ref?: FieldRef; // reference to original object
}

export interface FieldError {
    hasError: boolean;
    errorMsg: string;
}

export type FieldIdError = Record<"fieldId", string> & Record<"error", FieldError>;

/**
 * Represents a field error type
 */
export interface FieldErrorInfo extends FieldError {
    field: string;
    hasError: boolean;
    errorMsg: string;
}

export interface FieldEvent {
    click?: ClickEvent;
    input?: InputEvent;
    change?: ChangeEvent | Array<ChangeEvent>;
}

export interface FieldDisplayProps {
    /** For large devices */
    lg?: number;
    /** For medium devices */
    md?: number;
    /** For small devices */
    sm?: number;
    /** For very small devices */
    xs?: number;
    /** Offset distance from row start */
    offset?: string;
    /** Wheter to start field from a new row position */
    rs?: boolean; // row start
    isStandalone?: boolean;
    /** Field alignment */
    align?: string; // left, right, center
    /** Layout inside field */
    fieldLayout?: string;
    /** Layout for dropdown options */
    optionsLayout?: string;
}

/**
 * This represents each form field in the metaform schema
 */
export interface Field {
    /**
     * The name of the field
     */
    name: string;
    /**
     * This property is used for grouping the field while submitting the form.
     * Use `null` if field has no parent key while submitting the form
     */
    prop?: string | null;
    /**
     * This property contains meta information (field details ) about the field
     */
    meta: Meta;
    /**
     * A list of children fields
     */
    fields?: Array<Field>;
}

export type FieldValueSerializable = Exclude<FieldValue, Date>;

export interface FormField {
    name: string;
    section: string;
    prop?: string | null;

    className?: string;
    config?: FieldConfig;
    events?: FieldEvent;
    error: FieldError; // internal

    display: boolean; // internal
    displayName?: string;
    displayProps?: FieldDisplayProps;
    htmlProps?: Record<string, string>;
    displayType?: string;
    type?: string;
    value: FieldValueSerializable;
    placeholder?: string;

    isDisabled?: boolean;
    isReadonly?: boolean;
    options?: Array<FieldOption>;
    file?: MFile; // for file type
    files?: Array<MFile>; // for file type
    validation?: FieldValidation;

    iconName?: string; // icon name

    isArray?: boolean;
}

export interface FormSectionData {
    [key: string]: FormField;
}

export interface MuiFormData {
    [key: string]: FormSectionData;
}

export interface OutputFormData {
    [key: string]: string | number | boolean | OutputFormData | Array<string | number | File>;
}

export interface ConfigParam {
    key: string;
    value: string;
}