import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,Outlet
} from "react-router";


import Signup from '../account/Signup';
import Login from '../account/Login';
import Chat from '../pages/Chat';
import Home from '../pages/Home';
function Layout(){
    return(
        <>
        <Outlet></Outlet>
        </>
    )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/signup",
          element:<Signup></Signup>
        },
        {
            path:"/login",
            element:<Login></Login>
        },
        {
            path:"/chat",
            element:<Chat></Chat>
        }
    ]
  },
]);

function Router() {
  return (
    <div>
  <RouterProvider router={router} />
    </div>
  )
}

export default Router