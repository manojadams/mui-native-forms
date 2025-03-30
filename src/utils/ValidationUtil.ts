import type { Field, FieldError, FieldIdError, FieldValueSerializable, FormField } from "../common/constants";
import type { FieldValidation } from "../common/validation-constants";
import Metaform from "../store/Metaform";

class ValidationUtil {
    static getValidationErrors(
        pageNumber: number,
        formData: Record<string, FormField>,
        schemaFields: Field[],
        metaform: Metaform,
        isGrouped: boolean
    ) {
            const _currentPageField = schemaFields[pageNumber - 1];
            const fields = isGrouped ? _currentPageField?.fields : schemaFields;
            if (!fields) return null;
            const section = isGrouped ? _currentPageField?.name : "default";
            let isValid = true;
            const validationErrors: Array<FieldIdError> = [];
            for (let i = 0; i < fields?.length; i++) {
                const schemaField = fields[i];
                const fieldId = metaform.getFieldId(section as string, schemaField?.name as string);
                const formField = formData[fieldId];
                const error = this.handleValidation(formField?.value, formField?.validation);
                validationErrors.push({fieldId, error});
                if (error.hasError) {
                    isValid = false;
                }
            }
            return {isValid, validationErrors};
    }
    static handleValidation(value: FieldValueSerializable, validations?: FieldValidation): FieldError {
        const error = {
            hasError: false,
            errorMsg: ""
        };
        if (validations && validations.required) {
            if (value === "") {
                error.hasError = true;
                error.errorMsg = "Required";
                return error;
            }
        }
        return error;
    }
}

export default ValidationUtil;
