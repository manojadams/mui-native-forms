import React from "react";
import Metaform from "./Metaform";

const MetaformContext = React.createContext(
    new Metaform()
);

export default MetaformContext;
