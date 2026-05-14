import { createBrowserRouter, Navigate } from "react-router-dom";
import Header from "../component/Header";
import User from "../page/User";
import UserUseToDay from "../page/UserUseToDay";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/user" replace />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "user-today",
        element: <UserUseToDay />,
      },
    ],
  },
]);

export default router;
