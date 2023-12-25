import { Outlet } from "react-router-dom";


import Navbar from "../Shared/Navbar";


const LayOut = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default LayOut;