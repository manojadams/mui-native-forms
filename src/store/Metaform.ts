import type { FormField } from "../common/constants";
import type { Config, Schema } from "../common/core-constants";
import type { CustomComponentProps } from "../common/types";
import FormUtils from "../utils/FormUtil";
import { v4 as uuidV4 } from "uuid";

class Metaform {
    formIds: Record<string, Record<string, string>>; // contains record by section name: Record<field name, field properties>
    config: Config;
    components: Record<string, React.FC<CustomComponentProps>>;
    constructor() {
        this.formIds = {};
        this.config = {
            gapX: 0,
            gapY: 0
        };
        this.components = {};
    }
    initFields(schema: Schema, config?: Config) {
        this.config.gapX = config?.gapX ?? 0;
        this.config.gapY = config?.gapY ?? 0;
        let _formData: Record<string, FormField> = {};
        let totalSections = 0;
        let isGrouped = false;
        let _formIds: Record<string, Record<string, string>> = {};
        if (FormUtils.hasSections(schema.fields)) {
            schema.fields.forEach(parentField => {
                _formIds[parentField.name] = {};
                parentField.fields && parentField.fields.forEach((field) => {
                    const uid = uuidV4();
                    _formData[uid] = FormUtils.getInitialData(field, field.meta.value, parentField.name);
                    const fieldIds = _formIds[parentField.name];
                    if (fieldIds) {
                        fieldIds[field.name] = uid;
                    }
                })
                totalSections++;
            });
            isGrouped = true;
        } else {
            _formIds["default"] = {};
            schema.fields.forEach(field => {
                const uid = uuidV4();
                _formData[uid] = FormUtils.getInitialData(field, field.meta.value, "default");
                const fieldIds = _formIds["default"];
                if (fieldIds) {
                    fieldIds[field.name] = uid;
                }
            });
            totalSections = 1;
        }
        this.formIds = _formIds;
        return {formData: _formData, totalPages: totalSections, isGrouped};
    }
    getComponent(displayType: string) {
        return this.components[displayType];
    }
    setComponents(components: Record<string, React.FC<CustomComponentProps>>) {
        this.components = components;
    }
    getFormIdsData() {
        return this.formIds;    
    }
    setSectionId(section: string) {
        this.formIds[section] = {};
    }
    getFieldId(section: string, field: string): string {
        if (this.formIds && this.formIds[section]) {
            return this.formIds[section][field] ?? "";
        }
        return "";
    }
    setFieldId(section: string, field: string, uid: string) {
        if (this.formIds && this.formIds[section]) {
            this.formIds[section][field] = uid;
        }
    }
}

export default Metaform;
