import {createContext, useEffect, useState} from "react";

export const Context = createContext();
export const ContextProvider = ({children}) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        console.log('click');
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <Context.Provider value={{theme, toggleTheme}}>
            {children}
        </Context.Provider>
    )
}