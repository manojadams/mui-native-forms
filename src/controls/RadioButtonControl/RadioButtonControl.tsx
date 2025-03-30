import { View } from "react-native";
import type { Field, FieldControlProps } from "../../common/constants";
import { SegmentedButtons, Text } from "react-native-paper";

interface Props extends FieldControlProps {
    field: Field;
}

function RadioButtonControl(props: Props) {
    return (
        <View>
            <Text>Payment Mode</Text>
            <SegmentedButtons
                value={props.value}
                onValueChange={props.onChange}
                buttons={props.field.meta.options as Array<{label: string, value: string}>} 
            />
        </View>
    )
}

export default RadioButtonControl;
