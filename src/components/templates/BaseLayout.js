import axios from "axios";
import {Context} from '../../Context';
import Footer from "../molecules/Footer/Footer";
import {Outlet, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import MainHeader from "../molecules/Header/MainHeader";

export default function BaseLayout() {
    const {theme = 'dark', language = 'en'} = useContext(Context);
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState(location.pathname);

    const exams = () => {
        const formData = new FormData();
        formData.append('operations', JSON.stringify({query: `mutation Login{login(loginArgs: {email: "teacher@ctuet.edu.vn", password: "teacher@123"}){access_token}}`}),);
        formData.append('map', JSON.stringify({}));
        try {
            axios({
                method: 'post',
                url: 'https://exam-management-system-z76m.onrender.com/graphql',
                headers: {'apollo-require-preflight': true, 'content-type': 'multipart/form-data'},
                data: formData,
            });
        } catch (e) {
            console.log('Preparing for Q&E Management System ...')
        }
    }

    const labs = () => {
        try {
            axios.get('https://laboratory-management-system.onrender.com/apis/categories');
        } catch (error) {
            console.log('Prepared for LIMS Management System ...')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            labs()
        }, 20000);
        setTimeout(() => {
            exams()
        }, 20000)
    });

    useEffect(() => {
        if (location.pathname !== currentRoute) {
            setCurrentRoute(`${location.pathname}`);
        }
    }, [location.pathname, currentRoute]);

    useEffect(() => {
        if (language !== localStorage.getItem('language')) {
            window.location.href = currentRoute;
            localStorage.setItem('language', language);
        }
    }, [language, currentRoute]);

    return (<main className={`${theme}`}>
        <div className={'dark-filter'}></div>
        <MainHeader currentRoute={currentRoute}/>

        <div className={`container`}>
            <Outlet/>
        </div>

        <Footer/>
    </main>)
}