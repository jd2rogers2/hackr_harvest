import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { EventDisplay, Home }  from './pages';


const router = createBrowserRouter([
  { path: "/home", element: <Home /> },
  // { path: "/users/auth", element: Blah },
  // { path: "/users/:userId", element: Blah },
  // { path: "/users/:userId/update", element: Blah },
  // { path: "/events/create", element: Blah },
  { path: "/events/:eventId", element: <EventDisplay /> },
  // { path: "/events/:eventId/update", element: Blah },
  // { path: "/events", element: Blah },
  { path: "*", element: <Navigate to="/home" replace={true} /> },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
