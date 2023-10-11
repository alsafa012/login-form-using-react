import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import HeroRegister from "../Pages/HeroRegister/HeroRegister";


const createMyRouter = createBrowserRouter([
     {
       path: "/",
       element: <MainLayout></MainLayout>,
       children:[
          {
               path:"/",
               element:<Home></Home>
          },
          {
               path:"/login",
               element:<Login></Login>
          },
          {
               path:"/register",
               element:<Register></Register>
          },
          {
               path:"/heroRegister",
               element:<HeroRegister></HeroRegister>
          }
       ]
     },
   ]);
   
export default createMyRouter;