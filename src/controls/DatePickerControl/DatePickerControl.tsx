import { DatePickerInput } from "react-native-paper-dates";
import moment from "moment";
import type { Field, FieldControlProps } from "../../common/constants";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { fieldStyles } from "../../styles/control-styles";

interface Props extends FieldControlProps {
    field: Field;
}

function DatePickerControl(props: Props) {
    const dateFromString = props.value ? moment(props.value as string, "YYYY-MM-DD").toDate() : undefined;
    return (
        <View>
            <DatePickerInput
                disabled={props.field.meta.isDisabled}
                readOnly={props.field.meta.isReadonly}
                locale="en-GB"
                label={props.field?.meta?.displayName}
                inputMode="start"
                mode="flat"
                error={props.error.hasError}
                value={dateFromString}
                onChange={(_date) => props.onChange(moment(_date).format("YYYY-MM-DD"))}
            />
            {
                props.error.hasError && (
                    <Text style={fieldStyles.errorText}>{props.error.errorMsg}</Text>
                )             
            }
        </View>
    )
}

export default DatePickerControl;

