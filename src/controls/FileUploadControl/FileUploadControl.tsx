import { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import type { Field, FieldControlProps, MFile } from "../../common/constants";
import { launchImageLibrary } from "react-native-image-picker";
import { List, Text } from "react-native-paper";
import { fieldStyles } from "../../styles/control-styles";

interface Props extends FieldControlProps {
    field: Field;
    onFileChange: (file: MFile) => void;
}

// const OPTIONS = {
//     mediaType: "photo"
// }

function FileUploadControl(props: Props) {
    const [imageUri, setImageUri] = useState("");
    const [expanded, setExpanded] = useState(false);

    const handleUploadImage = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: "photo",
                includeBase64: true
            });
            if (result.assets && result.assets.length > 0) {
                const uri = result.assets.at(0)?.uri;
                const base64String = result.assets.at(0)?.base64;
                const fileName = result.assets.at(0)?.fileName;
                const type = result.assets.at(0)?.type;
                if (base64String && type && fileName) {
                    props.onFileChange({fileName, type, base64String});
                    setImageUri(uri ?? "");
                }
            }
            setExpanded(false);
        } catch(e) {
            console.error(e);
        }

    };
    const handleRemoveImage = () => {
        setImageUri("");
        props.onChange("");
        setExpanded(false);
    };
    const hasFilePreview = (props.field.meta.config as Record<string, boolean>)?.filePreview;
    return (
        <View>
            {
                imageUri && hasFilePreview && (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri: `${imageUri}`
                            }}
                            alt="Product Image"
                            width={150}
                            height={150}
                        />
                    </View>
                )
            }
            <List.Accordion
                expanded={expanded}
                title={props.field.meta.displayName}
                left={() => <List.Icon icon={imageUri ? "cloud-upload": "cloud-upload-outline"} />}
                onPress={() => setExpanded(!expanded)}
            >
                <List.Item
                    title="Upload"
                    right={() => <List.Icon icon="cloud-upload" />}
                    onPress={handleUploadImage}
                />
                <List.Item
                    title="Remove"
                    right={() => <List.Icon icon="close" />}
                    onPress={handleRemoveImage}
                />
            </List.Accordion>
            {
                props.error.hasError && (
                    <Text style={fieldStyles.errorText}>{props.error.errorMsg}</Text>
                )             
            }
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});

export default FileUploadControl;
