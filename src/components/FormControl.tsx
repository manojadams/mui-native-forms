import { memo, useContext } from "react";
import TextFieldControl from "../controls/TextFieldControl";
import { View } from "react-native";
import { Col } from "../styles";
import DatePickerControl from "../controls/DatePickerControl/DatePickerControl";
import { useRecoilState } from "recoil";
import { formControlStore } from "../store/form-data-store";
import type { Field, MFile } from "../common/constants";
import MetaformContext from "../store/metaform-context";
import SelectControl from "../controls/SelectControl";
import PasswordFieldControl from "../controls/PasswordFieldControl";
import MultitextControl from "../controls/MultitextControl";
import RadioButtonControl from "../controls/RadioButtonControl";
import withCustomComponent from "../controls/CustomComponent/CustomComponent";
import NumberControl from "../controls/NumberControl";
import FileUploadControl from "../controls/FileUploadControl";
import { Text } from "react-native-paper";

interface Props {
    field: Field;
    section: string;
}

function FormControl(props: Props) {
    const metaformContext = useContext(MetaformContext);
    const [field, setField] = useRecoilState(formControlStore(metaformContext.getFieldId(props.section, props.field.name)));

    // const handleValidation = () => {

    // };

    const handleFileChange = (file: MFile) => {
        if (!field?.name) return;
        setField({
            ...field,
            file,
            value: file.fileName
        });
    };

    const handleChange = (value: any) => {
        if (!field?.error) {
            return;
        }
        setField({
            ...field,
            value: value as string
        });
    };

    const render = () => {
        if (!field?.error) return;
        switch (props.field.meta.displayType) {
            case "header":
                return (
                    <Text variant="headlineMedium">{props.field.meta.displayName}</Text>
                )
            case "number":
            case "currency":
                return <NumberControl error={field.error} field={props.field} onChange={handleChange} value={field?.value as string} />
            case "text":
            case "input-mask":
            case "email":
            case "phone":
                return <TextFieldControl error={field.error} field={props.field} onChange={handleChange} value={field?.value as string} />
            case "password":
                return <PasswordFieldControl error={field.error} field={props.field} onChange={handleChange} value={field?.value as string} />
            case "multitext":
                return <MultitextControl error={field.error} field={props.field} onChange={handleChange} value={field?.value as string} />
            case "select":
                return <SelectControl error={field.error} field={props.field} onChange={handleChange} value={field?.value as string} />
            case "date":
                return <DatePickerControl error={field.error} field={props.field} onChange={handleChange} value={field?.value as string} />
            case "radio":
            case "radio-button":
                return <RadioButtonControl error={field.error} field={props.field} onChange={handleChange} value={field?.value as string} />
            case "file":
                return <FileUploadControl error={field.error} field={props.field} onChange={() => {}} onFileChange={handleFileChange} value={field?.value as string} />
            default:
                if (props.field.meta?.displayType) {
                    const customComponent = metaformContext.getComponent(props.field.meta.displayType);
                    if (customComponent !== undefined) {
                        const LoadedCustomComponent = withCustomComponent(customComponent);
                        return (
                            <LoadedCustomComponent
                                name={props.field.name}
                                error={field.error}
                                field={props.field}
                                value={field.value as string}
                                onChange={handleChange}
                            />
                        )
                    }
                }
                return <View></View>
        }
    }
    return (
        <Col gapY={metaformContext.config.gapY}>
            {render()}
        </Col>
    );
}

export default memo(FormControl);
