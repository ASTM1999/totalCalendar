import React, { ReactNode } from "react";
import { useRecoilState } from "recoil";
import { contextValueState } from "./atoms/contextValueState";


export const MyContext = React.createContext('');

export function MyContextProvider({ children }: { children: ReactNode; }) {
    const [contextValue, setContextValue] = useRecoilState(contextValueState);

    const handleClick = () => {
        setContextValue('Updated Value');
    };

    console.log({children})
    return (
        <MyContext.Provider value={contextValue}>
            {children}
            <button onClick={handleClick}>Update Context Value</button>
        </MyContext.Provider>
    );
}

