import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

interface Props {
    pageNumber: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
};

function Footer(props: Props) {
    return (
        <View style={styles.container}>
            {
                props.pageNumber > 1 && <Button onPress={props.onPrevious}>Previous</Button>
            }
            {
                props.pageNumber < props.totalPages && <Button mode="contained" onPress={props.onNext}>Next</Button>
            }
            {
                props.pageNumber === props.totalPages && <Button mode="contained" onPress={props.onSubmit}>Submit</Button>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
});

export default Footer;
