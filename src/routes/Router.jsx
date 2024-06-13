import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import AllFoods from "../pages/AllFoods/AllFoods";
import Gallery from "../pages/Gallery/Gallery";
import SingleFood from "../pages/SingleFood/SingleFood";
import PurchaseFood from "../pages/PurchaseFood/PurchaseFood";
import PrivateRoute from "./PrivateRoute";
import MyOrders from "../pages/MyOrders/MyOrders";
import AddFoods from "../pages/AddFoods/AddFoods";
import MyFoods from "../pages/MyFoods/MyFoods";
import UpdateFood from "../pages/UpdateFoods/UpdateFood";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children:[
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/signin",
                element: <SignIn />
            },
            {
                path: "/signup",
                element: <SignUp />
            },
            {
                path: "/all-foods",
                element: <AllFoods />,
                loader: () => fetch("https://b9a11-server-side-mdsabbiralmamon.vercel.app/storedFood")
            },
            {
                path: "/gallery",
                element: <Gallery />,
                loader: () => fetch("https://b9a11-server-side-mdsabbiralmamon.vercel.app/photos")
            },
            {
                path: "/foods/:id",
                element: <SingleFood />,
                loader: ({params}) => fetch(`https://b9a11-server-side-mdsabbiralmamon.vercel.app/storedFood/food/${params.id}`)
            },
            {
                path: "/purchase/:id",
                element: <PrivateRoute><PurchaseFood /></PrivateRoute>,
                loader: ({params}) => fetch(`https://b9a11-server-side-mdsabbiralmamon.vercel.app/storedFood/food/${params.id}`)
            },
            {
                path: "/my-orders",
                element: <PrivateRoute><MyOrders /></PrivateRoute>
            },
            {
                path: "/add-foods",
                element: <PrivateRoute><AddFoods /></PrivateRoute>
            },
            {
                path: "/my-foods/:email",
                element: <PrivateRoute><MyFoods /></PrivateRoute>
            },
            {
                path: "/update-food/:id",
                element: <PrivateRoute><UpdateFood /></PrivateRoute>
            }
        ]
    }
]);

export default Router;