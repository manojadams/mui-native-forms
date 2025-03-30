import type { FieldErrorInfo } from "../common/constants";

class ErrorUtil {
    static setErrors(errors: FieldErrorInfo | Array<FieldErrorInfo>) {
        console.log(errors);
        // const page = this.metaform.getPage();
        // const section = this.metaform.getSectionName(page.pageNumber);

        // try {
        //     if (Array.isArray(errors)) {
        //         errors.forEach((error) => {
        //             const { field, hasError, errorMsg } = error;
        //             this.metaform.setError(section?.name ?? "", field, {
        //                 hasError,
        //                 errorMsg
        //             });
        //         });
        //     } else {
        //         const { field, hasError, errorMsg } = errors;
        //         this.metaform.setError(section?.name ?? "", field, {
        //             hasError,
        //             errorMsg
        //         });
        //     }
        // } catch (e) {
        //     console.error(e);
        // }
    }
}

export default ErrorUtil;
