import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { WebsiteBuilder } from "./pages/WebsiteBuilder";
import { BlogList } from "./pages/BlogList";
import { BlogPost } from "./pages/BlogPost";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { PostEditor } from "./pages/admin/PostEditor";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/website-builder",
    Component: WebsiteBuilder,
  },
  {
    path: "/blog",
    Component: BlogList,
  },
  {
    path: "/blog/:slug",
    Component: BlogPost,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/post/new",
    Component: PostEditor,
  },
  {
    path: "/admin/post/edit/:id",
    Component: PostEditor,
  },
  {
    path: "*",
    Component: HomePage,
  },
]);
