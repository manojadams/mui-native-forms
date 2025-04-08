import { View } from "react-native";
import type { Field, FieldControlProps } from "../../common/constants";
import { Text, TextInput, type TextInputProps } from "react-native-paper";
import { fieldStyles } from "../../styles/control-styles";
import FormUtils from "../../utils/FormUtil";

interface Props extends FieldControlProps {
    field: Field;
}

function MultitextControl(props: Props) {
    const maxLength = FormUtils.getNumberOrUndefined(props.field.meta?.validation?.max);
    // TODO - fix datatype any
    const numberOfLines = ((props.field.meta.config as Record<string, string>).numberOfLines as any) || 4;

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
                numberOfLines={numberOfLines}
                maxLength={maxLength}
                multiline
            />
            {
                props.error.hasError && (
                    <Text style={fieldStyles.errorText}>{props.error.errorMsg}</Text>
                )             
            }
        </View>
    );
}

export default MultitextControl;
