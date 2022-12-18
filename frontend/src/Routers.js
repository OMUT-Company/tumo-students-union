import {createBrowserRouter} from "react-router-dom"
import Home from "./Pages/Home";
import Events from "./Pages/Events";
import FAQ from "./Pages/FAQ";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Pages/404";
import Admin from "./Pages/Admin";
import Error from "./Pages/Error";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Protected from "./Layouts/Protected";
import AddFunder from "./Pages/Admin/Organziation/AddFunder";
import SeeFunder from "./Pages/Admin/Organziation/SeeFunder";
import SeeSuggestions from "./Pages/Admin/Organziation/SeeSuggestions";
import AddEvent from "./Pages/Admin/Event/AddEvent";
import SeeEvent from "./Pages/Admin/Event/SeeEvent";

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
        element:<Admin/>,
        errorElement: <Error/>
    },
    {
        path: "*",
        element: <NotFound/>,
        errorElement: <Error/>
    },
    {
        path:"/admin/dashboard",
        element:<AdminDashboard/>,
        errorElement:<Error/>
    },
    {
        path:"/admin/dashboard/funder/add",
        element:<AddFunder/>,
        errorElement:<Error/>
    },
    {
        path:"/admin/dashboard/funder/see",
        element:<SeeFunder/>,
        errorElement:<Error/>
    },
    {
        path:"/admin/dashboard/funder/suggestion",
        element:<SeeSuggestions/>,
        errorElement:<Error/>
    },
    {
        path:"/admin/dashboard/event/add",
        element:<AddEvent/>,
        errorElement:<Error/>
    },
    {
        path:"/admin/dashboard/event/see",
        element:<SeeEvent/>,
        errorElement:<Error/>
    }
])