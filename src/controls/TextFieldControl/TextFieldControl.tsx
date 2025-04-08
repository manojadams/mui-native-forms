// import { type ReactNode } from "react";
import { View } from "react-native";
import { Text, TextInput, type TextInputProps } from "react-native-paper";
import type { Field, FieldControlProps } from "../../common/constants";
import { fieldStyles } from "../../styles/control-styles";
import FormUtils from "../../utils/FormUtil";

// interface ColProps {
//     children: ReactNode;
//     style?: Record<string, string>;
// }

interface Props extends FieldControlProps {
    field: Field;
}

function TextFieldControl(props: Props) {
    const maxLength = FormUtils.getNumberOrUndefined(props.field.meta?.validation?.max);

    return (
        <View>
            <TextInput
                autoComplete={props.field.meta.autoComplete as TextInputProps["autoComplete"]}
                disabled={props.field.meta.isDisabled}
                readOnly={props.field.meta.isReadonly}
                label={props.field.meta.displayName}
                error={props.error.hasError}
                value={props.value as string}
                onChangeText={props.onChange}
                right={props.field.meta.iconName ? <TextInput.Icon icon={props.field.meta.iconName} /> : <View></View>}
                maxLength={maxLength}
            />
            {
                props.error.hasError && (
                    <Text style={fieldStyles.errorText}>{props.error.errorMsg}</Text>
                )             
            }
        </View>
    );
}

export default TextFieldControl;
