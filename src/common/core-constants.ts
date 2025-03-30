import type { ConfigParam, Field } from "./constants";

export interface RestConfig {
    type?: string;
    apihost?: string;
    basepath?: string;
    protocol?: string;
    headers?: Array<ConfigParam>;
}

/**
 * Rest configuration to be used in schema definition
 */
export interface Rest {
    config: RestConfig;
}

/**
 * The schema definition used in metaforms
 */
export interface Schema {
    /**
     * Rest configuration
     */
    rest?: RestConfig;
    /**
     * List of form fields
     */
    fields: Array<Field>;
    /**
     * Button definitions in the form
     */
    buttons?: Array<Field>;
};

export interface Config {
    variant?: string;
    size?: string;
    tabs?: {
        variant?: string;
        disabled?: Array<number | string>;
    };
    gapX?: number;
    gapY?: number;
    loader?: {
        color?: string;
        enabled?: boolean;
    };
}
