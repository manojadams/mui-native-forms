import MuiNativeForms, { type Props } from "./MuiNativeForms";
import { RecoilRoot } from "recoil";

function MuiNativeFormRenderer(props: Props) {
    return (
        <RecoilRoot>
            <MuiNativeForms {...props} />
        </RecoilRoot>
    );
}

export default MuiNativeFormRenderer;
