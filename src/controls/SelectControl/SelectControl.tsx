import { useState } from "react";
import { StyleSheet, View } from "react-native";
import type { Field, FieldControlProps, FieldOption } from "../../common/constants";
import { Text } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { fieldStyles } from "../../styles/control-styles";

interface Props extends FieldControlProps {
    field: Field;
}

function SelectControl(props: Props) {
    const [isShown, setShown] = useState(false);
    const handleChange = (option: FieldOption) => {
        props.onChange(option.value as string);
        toggleDropdown();
    }
    console.log(handleChange);
    const toggleDropdown = () => {
        setShown(!isShown);
    }
    return (
        <View style={{position: "relative"}}>
            {
                props.field?.meta?.options && (
                    <Dropdown
                        fontFamily="Comfortaa-Regular"
                        itemTextStyle={{
                          color: "#1C1E21"
                        }}
                        placeholder={`Select ${props.field.meta.displayName}`}
                        placeholderStyle={{
                          color: "#1C1E21"
                        }}
                        style={styles.dropdown}
                        data={props.field.meta.options}
                        labelField='label'
                        valueField='value'
                        value={props.value}
                        onChange={(item) => {
                            props.onChange(item.value as string);
                        }}
                    />
                )
            }
            {
                props.error.hasError && (
                    <Text style={fieldStyles.errorText}>{props.error.errorMsg}</Text>
                )             
            }
        </View>
    );
}

const styles = StyleSheet.create({
    dropdown: {
      color: "black",
      height: 55,
      backgroundColor: '#f0e8f3',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: "#1C1E21"
    },
    textItem: {
      flex: 1,
      fontSize: 18,
      fontFamily: "Comfortaa-Regular",
      color: "black!important"
    },
    placeholderStyle: {
      fontSize: 18,
    },
    selectedTextStyle: {
      fontSize: 18,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

export default SelectControl;
