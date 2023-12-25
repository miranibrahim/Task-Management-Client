import { createBrowserRouter } from "react-router-dom";
import LayOut from "../MainLayOut/LayOut";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UserCommunity from "../Pages/UserCommunity/UserCommunity";
import UpdateTask from "../Pages/UpdateTask/UpdateTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut></LayOut>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateTask/:id",
        element: (
          <PrivateRoute>
            <UpdateTask></UpdateTask>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://task-management-server-alpha-seven.vercel.app/tasks/${params.id}`),
      },
      {
        path: "/community",
        element: <UserCommunity></UserCommunity>,
      },
    ],
  },
]);

export default router;
