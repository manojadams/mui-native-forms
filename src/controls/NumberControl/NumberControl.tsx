import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import type { Field, FieldControlProps } from "../../common/constants";
import { fieldStyles } from "../../styles/control-styles";

interface Props extends FieldControlProps {
    field: Field;
}

function NumberControl(props: Props) {
    return (
        <View>
            <TextInput
                keyboardType="numeric"
                label={props.field.meta.displayName}
                error={props.error.hasError}
                value={props.value as string}
                onChangeText={props.onChange}
                right={props.field.meta.iconName ? <TextInput.Icon icon={props.field.meta.iconName} /> : <View></View>}
            />
            {
                props.error.hasError && (
                    <Text style={fieldStyles.errorText}>{props.error.errorMsg}</Text>
                )             
            }
        </View>
    )
}

export default NumberControl;
