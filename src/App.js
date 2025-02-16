import './assets/app.scss';
import {Outlet} from "react-router-dom";
import {ContextProvider} from "./Context";
import './assets/themes/light-theme.scss';
import './assets/themes/dark-theme.scss';
import ParticlesComponent from "./components/templates/particles";

function App() {
    return (
        <ContextProvider>
            <Outlet/>
            <ParticlesComponent id={'particles'}/>
        </ContextProvider>
    );
}

export default App;
