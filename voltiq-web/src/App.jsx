import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./routes/Home/Home";
import { Layout } from "./components/Layout/Layout";
import { listingDetailsLoader } from "./api/listingDetailsLoader";
import { ListingPage } from "./routes/ListingPage/ListingPage";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";
import { User } from "./routes/User/User";
import { userPageLoader } from "./api/userPageLoader";
import { ListPage } from "./routes/ListPage/ListPage";
import { About } from "./routes/About/About";
import { Register } from "./routes/Register/Register";
import { Login } from "./routes/Login/Login";
import { Logout } from "./auth/Logout";
import { PrivateRoute } from "./auth/PrivateRoute";
import { GuestRoute } from "./auth/GuestRoute";
import { AddListing } from "./routes/AddListing/AddListing";
import { Contact } from "./routes/Contact/Contact";
import { Regulations } from "./routes/Regulations/Regulations";
import { Privacy } from "./routes/Privacy/Privacy";
import { Cookies } from "./routes/Cookies/Cookies";
import { AdminLayout } from "./admin/AdminLayout/AdminLayout";
import { AdminRoute } from "./auth/AdminRoute";
import { AdminUsersList } from "./admin/routes/AdminUsersList/AdminUsersList";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/listings", element: <ListPage /> },
        {
          path: "/listing/:id",
          element: <ListingPage />,
          loader: listingDetailsLoader,
          errorElement: <NotFoundPage />,
        },
        {
          path: "/listing/add",
          element: (
            <PrivateRoute>
              <AddListing />
            </PrivateRoute>
          ),
        },
        {
          path: "/profile/:id",
          element: <User />,
          loader: userPageLoader,
        },
        {
          path: "/login",
          element: (
            <GuestRoute>
              <Login />
            </GuestRoute>
          ),
        },
        {
          path: "/register",
          element: (
            <GuestRoute>
              <Register />
            </GuestRoute>
          ),
        },
        {
          path: "/logout",
          element: (
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          ),
        },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/regulations", element: <Regulations /> },
        { path: "/privacy", element: <Privacy /> },
        { path: "/cookies", element: <Cookies /> },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/users",
          element: (
            <AdminRoute>
              <AdminUsersList />
            </AdminRoute>
          ),
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
