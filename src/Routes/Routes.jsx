import { createBrowserRouter } from "react-router-dom";
import LayOut from "../MainLayOut/LayOut";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut></LayOut>,
    children: [
        {
            
        }
    ]
  },
]);

export default router;
