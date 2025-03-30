import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Footer from "./components/Footer";
import FormUtils from "./utils/FormUtil";
import { useRecoilState } from "recoil";
import formDataStore from "./store/form-data-store";
import pageStore from "./store/page-store";
import { Container } from "./styles";
import type { Config, Schema } from "./common/core-constants";
import FormContent from "./components/FormContent";
import Metaform from "./store/Metaform";
import MetaformContext from "./store/metaform-context";
import type { CustomComponentProps } from "./common/types";
import "react-native-get-random-values";
import ValidationUtil from "./utils/ValidationUtil";
import type { FormField } from "./common/constants";
import { getDefaultConfig } from "./utils/Util";

type Fn = (args: Record<string, boolean>) => void;

export interface Props {
    schema: Schema;
    fns?: Record<string, Function>;
    config?: Config;
    components?: Record<string, React.FC<CustomComponentProps>>;
    sectionLayout?: 'stepper' | 'tab' | 'wizard';
    onNext?: (values: Record<string, any>) => unknown;
    onSubmit: (values: Record<string, any>, pageNumber: number, setErrors?: Fn) => void;
}

function MuiNativeForms(props: Props) {
    const [formData, setFormData] = useRecoilState(formDataStore('form-data'));
    // const {page, initPage, previous, next} = usePageHook();
    const [page, setPage] = useRecoilState(pageStore);
    const [isReady, setReady] = useState(false);
    const [metaform, setMetaform] = useState<Metaform>(new Metaform());

    useEffect(() => {
        const {formData, isGrouped, totalPages} = metaform.initFields(props.schema, props.config || getDefaultConfig());
        if (props.components) {
            metaform.setComponents(props.components);
        }
        setPage({
            ...page,
            totalPages,
            isGrouped
        });
        setMetaform(metaform);
        setFormData(formData);
        setReady(true);
        return () => {
            setPage({
                ...page,
                pageNumber: 1,
                totalPages: 1
            });
        }
    }, []);

    const setErrors = () => {};

    const submit = async () => {
        try {
            props.onSubmit(
                await FormUtils.updateFormData(metaform.getFormIdsData(), formData, {}),
                page.pageNumber,
                setErrors
            );
        } catch(e) {
            console.error(e);
        }
    };
    const handleSubmit = async() => {
        if (applyValidation()) {
            submit();
        }
    }
    const next = () => {
        if (page.pageNumber < page.totalPages) {
            setPage({
                ...page,
                pageNumber: page.pageNumber + 1
            })
        }
    }
    const previous = () => {
        if (page.pageNumber > 1) {
            setPage({
                ...page,
                pageNumber: page.pageNumber - 1
            })
        }
    }
    const applyValidation = () => {
        let errors = ValidationUtil.getValidationErrors(page.pageNumber, formData, props.schema.fields, metaform, page.isGrouped);
        if (!errors?.validationErrors) return true;
        let _formData: Record<string, FormField> = {};
        errors.validationErrors.forEach(validationError => {
            const formDataField = formData[validationError.fieldId];
            if (formDataField) {
                formDataField.error = validationError.error;
            }
        });
        setFormData({...formData, ..._formData});
        return errors.isValid;
    }
    const handleNext = async () => {
        if (applyValidation()) {
            if (props.onNext) {
                const section = props.schema.fields[page.pageNumber - 1]?.name ?? "DEFAULT";
                const onNextFormData = await FormUtils.updateSectionFormData(
                    section,
                    metaform.getFormIdsData(), formData, {}
                );
                const result = await Promise.resolve(props.onNext(onNextFormData));
                if (result) next();
            } else {
                next();
            }
        }
    };
    const handlePrevious = () => {
        previous();
    };
    return (
        <MetaformContext.Provider value={metaform}>
            <Container style={styles.container}>
                {isReady && <FormContent fields={props.schema.fields} pageNumber={page.pageNumber} />}
                <Footer
                    pageNumber={page.pageNumber}
                    totalPages={page.totalPages}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onSubmit={handleSubmit}
                />
            </Container>
        </MetaformContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {

    }
});

export default MuiNativeForms;
