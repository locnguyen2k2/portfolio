import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import BaseLayout from "./components/templates/BaseLayout";
import Project from "./components/pages/project/Project";
import About from "./components/pages/about/About";
import Skill from "./components/pages/skill/Skill";
import PageNotFound from "./components/pages/404";

const routes = createBrowserRouter([
    {
        path: "",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <BaseLayout/>,
                children: [
                    {
                        path: "/",
                        element: <About/>,
                    },
                    {
                        path: "/projects",
                        element: <Project/>,
                    },
                    {
                        path: "/skill",
                        element: <Skill/>,
                    },
                    {
                        path: "/about",
                        element: <About/>,
                    },
                    {
                        path: '*',
                        element: <PageNotFound/>
                    }
                ]
            },
        ]
    },
])

export default routes;