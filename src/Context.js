import {createContext, useState} from "react";
import {savedLanguage} from "./i18n";

export const Context = createContext();
export const ContextProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [language, setLanguage] = useState(savedLanguage);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    const toggleLanguage = () => {
        const newLanguage = language === 'vi' ? 'en' : 'vi';
        // localStorage.setItem('language', newLanguage);
        setLanguage(newLanguage);
    };

    return (
        <Context.Provider value={{theme, toggleTheme, language, toggleLanguage}}>
            {children}
        </Context.Provider>
    )
}