import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import {
  UserForm,
  EventDisplay,
  EventForm,
  Home,
  VerifyEmail,
  ResetPassword,
}  from './pages';
import { UserProvider } from './providers/UserProvider';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter([
  { path: "/home", element: <Home /> },
  { path: "/users/signup", element: <UserForm /> },
  { path: "/users/signin", element: <UserForm /> },
  { path: "/users/verify", element: <VerifyEmail /> },
  { path: "/users/reset", element: <ResetPassword /> },
  // { path: "/users/:userId", element: <UserProfile /> },
  { path: "/users/:userId/update", element: <UserForm /> },
  { path: "/events/create", element: <EventForm /> },
  { path: "/events/:eventId", element: <EventDisplay /> },
  // { path: "/events/:eventId/update", element: Blah },
  // { path: "/events", element: Blah },
  { path: "*", element: <Navigate to="/home" replace={true} /> },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
