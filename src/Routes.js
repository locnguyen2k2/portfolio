import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import BaseLayout from "./components/templates/BaseLayout";
import Home from "./components/pages/home/Home";
import Project from "./components/pages/project/Project";
import About from "./components/pages/about/About";
import Resume from "./components/pages/resume/Resume";
import Skill from "./components/pages/skill/Skill";

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
                        element: <Home/>,
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
                        path: "/resume",
                        element: <Resume/>,
                    }
                ]
            },
        ]
    },
    {
        path: '*',
        element: <h1>Not Found</h1>
    }
])

export default routes;