import {createBrowserRouter} from "react-router-dom"
import Home from "./Pages/Home";
import Events from "./Pages/Events";
import FAQ from "./Pages/FAQ";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Pages/404";
import Admin from "./Pages/Admin";
import Error from "./Pages/Error";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <Error/>
    },
    {
        path: "/events",
        element: <Events/>,
        errorElement: <Error/>
    },
    {
        path: "/faq",
        element: <FAQ/>,
        errorElement: <Error/>
    },
    {
        path: "about",
        element: <AboutUs/>,
        errorElement: <Error/>
    },
    {
        path: "admin",
        element: <Admin/>,
        errorElement: <Error/>
    },
    {
        path: "*",
        element: <NotFound/>,
        errorElement: <Error/>
    }
])