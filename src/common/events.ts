import type { FieldOption } from "./constants";
import type { FieldParam, FieldValue } from "./types";
import type { Condition } from "./validation-constants";

export interface ClickEvent {
    type: string; // submit, reset, next, previous, action (custom)
    value?: string;
}

export interface InputEvent {
    type: string;
    url: string;
    params: Array<FieldParam>;
    labelKey?: string;
    valueKey?: string;
    responseKey?: string;
    response?: string;
    value?: string;
}

export interface ChangeEvent {
    type: string; // setter
    name?: string;
    ref?: string; // ref not mandatory for eventemitter
    valueKey?: string;
    value?: FieldValue;
    valueFn?: string;
    valueMap?: Record<string, FieldValue | FieldOption>;
    section?: string;
    condition?: Condition[]; // for complex condition computation
    eventType?: string; // for emitter events
    payload?: any; // for emitter events
}