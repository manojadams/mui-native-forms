import { atomFamily, selectorFamily } from "recoil";
import type { FormField } from "../common/constants";

const formDataStore = atomFamily<Record<string, FormField>, string>({
    key: "mui-form-data",
    default: {}
});

export const formControlStore = selectorFamily({
    key: "mui-form-control-data",
    get: (name: string) => ({get}) => {
        const formData = get(formDataStore("form-data"))[name];
        return formData;
    },
    set: (name) => ({get, set}, newValue) => {
        const formData = get(formDataStore("form-data"));

        if (formData[name] && newValue) {
            set(formDataStore("form-data"), {
                ...formData,
                [name]: newValue as FormField
            });
        }
    }
});

export default formDataStore;

