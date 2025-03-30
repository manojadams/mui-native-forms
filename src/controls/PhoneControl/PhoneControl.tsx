import { View } from "react-native";
import type { Field, FieldControlProps } from "../../common/constants";

interface Props extends FieldControlProps {
    field: Field;
}

function PhoneControl(props: Props) {
    console.log(props);
    return (
        <View>

        </View>
    );
}

export default PhoneControl;
