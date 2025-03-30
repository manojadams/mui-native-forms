import FormControl from "./FormControl";
import { Row } from "../styles";
import type { Field } from "../common/constants";

interface Props {
    fields: Field[];
    section: string;
}

function FormSection(props: Props) {
    return (
        <Row>
            {
                props.fields.map(field => (
                    <FormControl key={field.name} field={field} section={props.section} />
                ))
            }
        </Row>
    );
}

export default FormSection;
