import './assets/app.scss';
import {Outlet} from "react-router-dom";
import {ContextProvider} from "./Context";
import './assets/themes/light-theme.scss';
import './assets/themes/dark-theme.scss';
import './assets/app';

function App() {
    return (
        <ContextProvider>
            <Outlet/>
        </ContextProvider>
    );
}

export default App;
