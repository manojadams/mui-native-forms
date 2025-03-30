import { useEffect, useState } from "react";
import { View } from "react-native";
import FormSection from "./FormSection";
import type { Field } from "../common/constants";
import { useRecoilValue } from "recoil";
import pageStore from "../store/page-store";

interface Props {
    fields: Field[];
    pageNumber: number;
}

function FormContent(props: Props) {
    const [currentPageField, setCurrentPageField] = useState<Field | null>(null);
    const page = useRecoilValue(pageStore);

    useEffect(() => {
        if (page.isGrouped) {
            const _currentPageField = props.fields[props.pageNumber - 1];
            _currentPageField && setCurrentPageField(_currentPageField);
        }
    }, [props.fields, props.pageNumber, page.isGrouped]);

    return (
        <View>
            {
                page.isGrouped && currentPageField &&
                    <FormSection key={currentPageField?.name} fields={currentPageField?.fields || []} section={currentPageField.name} />
            }
            {
                !page.isGrouped && <FormSection key="default" fields={props.fields} section={"default"} />
            }
        </View>
    );
}

export default FormContent;
