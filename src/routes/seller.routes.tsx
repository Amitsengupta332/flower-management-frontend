// import sellerDashboard from './../pages/seller/sellerDashboard';
import SalesDetails from "../pages/admin/SalesManagement/SalesDetails";
import SalesHistory from "../pages/admin/SalesManagement/SalesHistory";
import SellerDashboard from "../pages/sellers/sellerDashboard";

export const sellerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <SellerDashboard />,
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
];
