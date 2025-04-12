import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const LayOut = () => {
    const location = useLocation();

    const showNavbarRoutes = ["/", "/dashboard"];

    const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);

    return (
        <div className="">
            <div>
                {shouldShowNavbar && <Navbar />}
            </div>
            <Outlet />
        </div>
    );
};

export default LayOut;
