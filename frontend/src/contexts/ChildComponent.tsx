import React from "react";
import { MyContext } from "./MyContextProvider";

export function ChildComponent() {
    const contextData = React.useContext(MyContext);
    return <p>Context Value: {contextData}</p>;
}
