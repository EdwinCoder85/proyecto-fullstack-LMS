import {
  RiDashboard3Line,
  RiAccountCircleFill,
  RiSettings5Line,
} from "react-icons/ri";
import { TbFileAnalytics, TbCategory2 } from "react-icons/tb";
import { SiCoursera } from "react-icons/si";
import { MdCreateNewFolder, MdPayment } from "react-icons/md";

export const navbarRoutes = [
  {
    href: "/",
    text: "Home",
    auth: false,
  },
  {
    href: "/auth/login",
    text: "Login",
    auth: false,
  },
  {
    href: "/auth/register",
    text: "Register",
    auth: false,
  },
];

export const dashboardRoutes = [
  {
    href: "/dashboard",
    text: "Dashboard",
    icon: RiDashboard3Line,
    roles: ["admin", "user"],
  },
  {
    href: "/dashboard/courses",
    text: "Cursos",
    roles: ["admin", "user"],
    icon: SiCoursera,
  },
  {
    href: "/dashboard/courses/create",
    text: "Crea Curso",
    roles: ["admin"],
    icon: MdCreateNewFolder,
  },
  {
    href: "/dashboard/categories",
    text: "Categorias",
    roles: ["admin"],
    icon: TbCategory2,
  },
  {
    href: "/dashboard/categories/create",
    text: "Crea Categoria",
    roles: ["admin"],
    icon: MdCreateNewFolder,
  },
  {
    href: "/dashboard/users",
    text: "Users",
    icon: RiAccountCircleFill,
    roles: ["admin"],
  },
  {
    href: "/dashboard/settings",
    text: "Settings",
    roles: ["admin"],
    icon: RiSettings5Line,
  },
  {
    href: "/dashboard/analytics",
    text: "Analytics",
    roles: ["admin"],
    icon: TbFileAnalytics,
  },
  {
    href: "/dashboard/payments",
    text: "Payments",
    roles: ["admin","user"],
    icon: MdPayment,
  },
];
