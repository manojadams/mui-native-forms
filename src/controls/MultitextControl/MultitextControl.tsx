import { View } from "react-native";
import type { Field, FieldControlProps } from "../../common/constants";
import { Text, TextInput } from "react-native-paper";
import { fieldStyles } from "../../styles/control-styles";

interface Props extends FieldControlProps {
    field: Field;
}

function MultitextControl(props: Props) {
    return (
        <View>
            <TextInput
                label={props.field.meta.displayName}
                error={props.error.hasError}
                value={props.value as string}
                onChangeText={props.onChange}
                right={props.field.meta.iconName ? <TextInput.Icon icon={props.field.meta.iconName} /> : <View></View>}
                numberOfLines={4}
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
