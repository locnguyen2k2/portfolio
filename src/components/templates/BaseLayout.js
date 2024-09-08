import {Outlet} from "react-router-dom";
import HorizontalHeader from "../molecules/Header/HorizontalHeader/HorizontalHeader";
import {Context} from './../../Context';
import {useContext} from "react";
import Footer from "../molecules/Footer/Footer";

export default function BaseLayout() {
    const {theme} = useContext(Context);
    return (
        <main className={`${theme}`}>
            <HorizontalHeader/>
            <div className={`container`}>
                <Outlet/>
            </div>
            <Footer/>
        </main>
    )
}