import FlowerDashboard from "../pages/admin/FlowerDashboard";
import AllFlower from "../pages/admin/FlowerManagement/AllFlower";
import CreateFlower from "../pages/admin/FlowerManagement/CreateFlower";
import SalesDetails from "../pages/admin/SalesManagement/SalesDetails";
import SalesHistory from "../pages/admin/SalesManagement/SalesHistory";
import UpdateFlower from "../pages/admin/Update/UpdateFlower";
import Varient from "../pages/admin/Update/Varient";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FlowerDashboard />,
  },
  {
    name: "Flower Management",
    children: [
      {
        name: "Create Flower",
        path: "create-flower",
        element: <CreateFlower />,
      },
      {
        name: "All Flower",
        path: "all-flowers",
        element: <AllFlower />,
      },
    ],
  },
  {
    name: "Sales Management",
    children: [
      //   {
      //     name: "Create Admin",
      //     path: "create-admin",
      //     element: <CreateAdmin />,
      //   },
      {
        name: "Sales Flower",
        path: "sales-flower",
        element: <SalesDetails />,
      },
      {
        name: "Sales History",
        path: "sales-history",
        element: <SalesHistory />,
      },
    ],
  },
  {
    name: " ",
    path: "/admin/update-flower/:id",
    element: <UpdateFlower />,
  },
  {
    name: " ",
    path: "/admin/create-variant/:id",
    element: <Varient />,
  },
];