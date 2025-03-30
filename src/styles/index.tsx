import styled from "@emotion/native";
import { View } from "react-native";

export const Container = styled.ScrollView`

`;

export const Row = styled.View<{gapY?: string}>`
    display: flex;
    width: 100%;
    gap: ${props => props.gapY ?? 0};
`;

export const Col2 = styled.View`
    padding-top: 10px;
`;

interface ColProps {
    gapY?: number;
    children: React.ReactNode;
}

export function Col(props: ColProps) {
    return (
        <View style={{
            paddingTop: props.gapY
        }}>
            {props.children}
        </View>
    )
}