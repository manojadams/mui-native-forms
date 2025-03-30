import { useState } from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import type { Field, FieldControlProps } from "../../common/constants";
import { fieldStyles } from "../../styles/control-styles";

interface Props extends FieldControlProps {
    field: Field;
}

function PasswordFieldControl(props: Props) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View>
            <TextInput
                label={props.field.meta.displayName}
                value={props.value as string}
                secureTextEntry={showPassword ? false : true}
                right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={togglePassword}/>}
                onChangeText={props.onChange}
            />
            {
                props.error.hasError && (
                    <Text style={fieldStyles.errorText}>{props.error.errorMsg}</Text>
                )             
            }
        </View>
    );
}

export default PasswordFieldControl;
