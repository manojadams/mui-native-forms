import type { Field, FormField, FormSectionData, OutputFormData } from "../common/constants";
import { CONTROLS } from "../common/controls";
import type { FieldValue } from "../common/types";

/**
 * Form data utility
 */
class FormUtils {
    static hasSections(fields: Array<Field>) {
        return fields.find((field: Field) => field.meta.type === "section") !== undefined;
    }
    static updateFormData(formDataIds: Record<string, Record<string, string>>, formData: Record<string, FormField>, newFormData: OutputFormData): Promise<OutputFormData> {
        return new Promise((resolve) => {
            const allPendingUpdates = Object.keys(formDataIds).flatMap((section) => {
                const formSectionIds = formDataIds[section];
                if (!formSectionIds) return;
                return Object.keys(formSectionIds).map((fieldName) => {
                    const keyId = formDataIds && formDataIds[section] ? formDataIds[section][fieldName] : "";
                    if (!keyId) return;
                    const formField = formData[keyId];
                    if (!formField) {
                        throw Error("Error processing form data");
                    }
                    const prop = formField.prop;
                    return this.getFormFieldValue(formField).then((fieldValue) => {
                        if (prop) {
                            if (!newFormData[prop]) {
                                newFormData[prop] = {} as OutputFormData;
                            }
                            if (fieldValue) {
                                (newFormData[prop] as OutputFormData)[fieldName] = fieldValue as string | number | boolean;
                            }
                        } else {
                            // null prop is ignored
                            if (prop !== null) {
                                newFormData[fieldName] = fieldValue as string;
                            }
                        }
                    });
                });
            });
            Promise.all(allPendingUpdates)
                .then(() => this.updateNestedFormData(newFormData))
                .then(() => {
                    resolve(newFormData)
                });
        });
    }

    static async updateSectionFormData (
        section: string,
        formDataIds: Record<string, Record<string, string>>,
        formData: FormSectionData | null,
        newFormData: OutputFormData
    ): Promise<OutputFormData> {
        return new Promise((resolve) => {
            const formSectionIds = formDataIds[section];
            if (!formSectionIds) return;
            const allPendingUpdates = Object.keys(formSectionIds).map((fieldName) => {
                const keyId = formSectionIds[fieldName];
                if (!formData || !keyId) return;
                
                const formField = formData[keyId];
                if (!formField) {
                    throw Error("Error processing form data");
                }
                const prop = formField.prop;
                return this.getFormFieldValue(formField).then((fieldValue) => {
                    if (prop) {
                        if (!newFormData[prop]) {
                            newFormData[prop] = {} as OutputFormData;
                        }
                        (newFormData[prop] as OutputFormData)[fieldName] = fieldValue as string | number | boolean;
                    } else {
                        // null prop is ignored
                        if (prop !== null) {
                            newFormData[fieldName] = fieldValue as string;
                        }
                    }
                });
            });
            Promise.all(allPendingUpdates)
                .then(() => this.updateNestedFormData(newFormData))
                .then(() => {
                    resolve(newFormData)
                });
        });
    }
    static async updateNestedFormData(formData: OutputFormData) {
        Object.keys(formData).forEach(async (key: string) => {
            if (typeof formData[key] === "object") {
                const props = key.split("#");
                if (props.length > 1) {
                    // is nested prop
                    const propValue = props[0] as string;
                    if (!formData[propValue]) {
                        formData[propValue] = {};
                    }
                    await this.updateNestedProp(
                        formData[propValue] as OutputFormData,
                        props.slice(1),
                        (formData[key] as OutputFormData)[propValue] as FieldValue
                    );
                    delete formData[key];
                }
            }
        });
    }
    static async updateNestedProp(formData: OutputFormData, props: Array<string>, value: FieldValue) {
        if (props.length > 0) {
            const propValue = props[0] as string;
            if (props.length === 1) {
                if (formData) {
                    formData[propValue] = value as Exclude<FieldValue, undefined | null | Date>;
                }
            } else {
                if (!formData[propValue]) {
                    formData[propValue] = {};
                }
                await this.updateNestedProp(formData[propValue] as OutputFormData, props.slice(1), value);
            }
        }
    }
    static async getFormFieldValue(formField: FormField) {
        switch (formField.displayType) {
            case CONTROLS.FILE:
                if (formField.files) {
                    const _files = Array.from(formField.files);
                    let _filesData;
                    const hasBlobConfig = (formField.config as Record<string, boolean>)["blob"];
                    if (!hasBlobConfig) {
                        _filesData = await Promise.all(_files.map(async (_file) => await this.getBase64(_file)));
                    }
                    return {
                        name: formField.value,
                        [hasBlobConfig ? "files" : "filesData"]: hasBlobConfig ? formField.files : _filesData
                    };
                } else if (formField.file) {
                    return {
                        name: formField.value,
                        "value": formField.value, 
                        "file": formField.file
                    };
                } else if (formField.value) {
                    return formField.value;
                }

                return null;
            default:
                return formField.value;
        }
    }
    static getBase64(file: any) {
        return new Promise((resolve, reject) => {
            if (file) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => resolve(fileReader.result);
                fileReader.onerror = reject;
            } else {
                resolve(null);
            }
        });
    }
    /**
     * Reads initial field value for form fields
     * @param field
     * @param value
     * @returns
     */
    static getInitlalFieldValue(field: Field, value: Exclude<FieldValue, Date>) {
        if (value !== undefined) {
            return value;
        }

        return field?.meta?.value !== undefined ? field?.meta?.value : "";
    }
    static getInitialData(field: Field, value: FieldValue, sectionName: string): FormField {
        return {
            name: field.name,
            prop: field.prop,
            display: true,
            type: field.meta.type,
            value: this.getInitlalFieldValue(field, value as Exclude<FieldValue, Date>),
            isDisabled: field.meta.isDisabled,
            isReadonly: field.meta.isReadonly,
            displayName: field.meta.displayName,
            displayType: field.meta.displayType,
            displayProps: field.meta.displayProps,
            htmlProps: field.meta.htmlProps,
            options: field.meta.options,
            placeholder: field.meta.placeholder,
            isArray: field.meta.isArray,
            className: field.meta.className,
            events: field.meta.events,
            error: { hasError: false, errorMsg: "" },
            config: field.meta.config,
            iconName: field.meta.iconName,
            section: sectionName,
            validation: field.meta.validation
        }
    }
    static getNumberOrUndefined(num: unknown) {
        if (typeof num === "number") {
            return num;
        } else if (typeof num === "string") {
            return parseInt(num);
        }
        return;
    }
}

export default FormUtils;
