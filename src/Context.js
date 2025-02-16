import {createContext, useState} from "react";
import {savedLanguage} from "./i18n";

export const Context = createContext();
export const ContextProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [language, setLanguage] = useState(savedLanguage);
    const [isLoading, setIsLoading] = useState(false);

    const toggleHandleChangeTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    const toggleHandleLoadingStatus = () => {
        const loadingStatus = !isLoading;
        setTheme(loadingStatus);
    };

    const toggleHandleChangeLanguage = () => {
        const newLanguage = language === 'vi' ? 'en' : 'vi';
        // localStorage.setItem('language', newLanguage);
        setLanguage(newLanguage);
    };

    return (
        <Context.Provider
            value={{
                theme, toggleHandleChangeTheme,
                language, toggleHandleChangeLanguage,
                isLoading, toggleHandleLoadingStatus,
            }}>
            {children}
        </Context.Provider>
    )
}