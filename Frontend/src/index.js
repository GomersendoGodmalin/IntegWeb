import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Header from './Components/header';
import ErrorPage from './error-page';
import ForgotPassword from './Authentication/forgotpassword';
import Profile from './Content/profile';
import Login from './Authentication/login';
import Register from './Authentication/register';
import Activation from './Authentication/activation';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/forgotpassword", 
        element: <ForgotPassword />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/content/profile",
    element: <Profile />,
  },
  {
    path: "activate/:uid/:token",
    element: <Activation />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
