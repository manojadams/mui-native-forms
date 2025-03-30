import React, { useContext } from "react";
import type { CustomComponentProps } from "../../common/types";
import { useRecoilValue } from "recoil";
import formDataStore from "../../store/form-data-store";
import MetaformContext from "../../store/metaform-context";

const withCustomComponent = (InputCustomComponent: React.FC<CustomComponentProps>) => {
    const formData = useRecoilValue(formDataStore("form-data"));
    const metaformContext = useContext(MetaformContext);
    const getFieldValue = (section: string, fieldName: string) => {
        const fieldId = metaformContext.getFieldId(section, fieldName);
        if (formData[fieldId]) {
            return formData[fieldId].value;
        }
        return null;
    }
    class CustomComponent extends React.Component<CustomComponentProps> {
        constructor(props: Exclude<CustomComponentProps, "formData">) {
            super(props);
        }
        
        render() {
            return (
                <InputCustomComponent
                    {...this.props}
                    getFieldValue={getFieldValue}
                />
            )
        }
    }
    return CustomComponent;
}


export default withCustomComponent;
