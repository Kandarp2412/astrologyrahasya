import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { Account } from "./containers/account";
import { AuthGuard } from "./components/auth-guard";
import { GuestGuard } from "./components/guest-guard";
import { Customer } from "./containers/customer";
import { LoadingScreen } from "./components/loading-screen";
import { Organization } from "./containers/organization";
import { Product } from "./containers/product";
import { Reports } from "./containers/reports";
import { DashboardLayout } from "./containers/dashboard-layout";
import { MainLayout } from "./containers/main-layout";
import { Home } from "./containers/home";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// Auth pages
const Login = Loadable(
  lazy(() => import("./containers/login").then((module) => ({ default: module.Login })))
);
const PasswordRecovery = Loadable(
  lazy(() =>
    import("./containers/password-recovery").then((module) => ({
      default: module.PasswordRecovery,
    }))
  )
);
const PasswordReset = Loadable(
  lazy(() =>
    import("./containers/password-reset").then((module) => ({ default: module.PasswordReset }))
  )
);
const Register = Loadable(
  lazy(() => import("./containers/register").then((module) => ({ default: module.Register })))
);
const VerifyCode = Loadable(
  lazy(() => import("./containers/verify-code").then((module) => ({ default: module.VerifyCode })))
);

// Dashboard pages
const ReportsOverview = Loadable(
  lazy(() =>
    import("./containers/reports-overview").then((module) => ({ default: module.ReportsOverview }))
  )
);
const ReportsSales = Loadable(
  lazy(() =>
    import("./containers/reports-sales").then((module) => ({ default: module.ReportsSales }))
  )
);

const Customers = Loadable(
  lazy(() => import("./containers/customers").then((module) => ({ default: module.Customers })))
);
const CustomerActivity = Loadable(
  lazy(() =>
    import("./containers/customer-activity").then((module) => ({
      default: module.CustomerActivity,
    }))
  )
);
const CustomerOrders = Loadable(
  lazy(() =>
    import("./containers/customer-orders").then((module) => ({ default: module.CustomerOrders }))
  )
);
const CustomerSummary = Loadable(
  lazy(() =>
    import("./containers/customer-summary").then((module) => ({ default: module.CustomerSummary }))
  )
);

const Order = Loadable(
  lazy(() => import("./containers/order").then((module) => ({ default: module.Order })))
);
const Orders = Loadable(
  lazy(() => import("./containers/orders").then((module) => ({ default: module.Orders })))
);

const Products = Loadable(
  lazy(() => import("./containers/products").then((module) => ({ default: module.Products })))
);
const ProductAnalytics = Loadable(
  lazy(() =>
    import("./containers/product-analytics").then((module) => ({
      default: module.ProductAnalytics,
    }))
  )
);
const ProductInventory = Loadable(
  lazy(() =>
    import("./containers/product-inventory").then((module) => ({
      default: module.ProductInventory,
    }))
  )
);
const ProductSummary = Loadable(
  lazy(() =>
    import("./containers/product-summary").then((module) => ({ default: module.ProductSummary }))
  )
);

const AccountGeneral = Loadable(
  lazy(() =>
    import("./containers/account-general").then((module) => ({ default: module.AccountGeneral }))
  )
);
const AccountNotifications = Loadable(
  lazy(() =>
    import("./containers/account-notifications").then((module) => ({
      default: module.AccountNotifications,
    }))
  )
);

const OrganizationBilling = Loadable(
  lazy(() =>
    import("./containers/organization-billing").then((module) => ({
      default: module.OrganizationBilling,
    }))
  )
);
const OrganizationGeneral = Loadable(
  lazy(() =>
    import("./containers/organization-general").then((module) => ({
      default: module.OrganizationGeneral,
    }))
  )
);
const OrganizationTeam = Loadable(
  lazy(() =>
    import("./containers/organization-team").then((module) => ({
      default: module.OrganizationTeam,
    }))
  )
);

// Docs pages
const Docs = Loadable(
  lazy(() => import("./containers/docs").then((module) => ({ default: module.Docs })))
);

// Not found pages
const NotFound = Loadable(
  lazy(() => import("./containers/not-found").then((module) => ({ default: module.NotFound })))
);

const routes = [
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: "register",
    element: (
      <GuestGuard>
        <Register />
      </GuestGuard>
    ),
  },
  {
    path: "verify-code",
    element: (
      <GuestGuard>
        <VerifyCode />
      </GuestGuard>
    ),
  },
  {
    path: "password-recovery",
    element: (
      <GuestGuard>
        <PasswordRecovery />
      </GuestGuard>
    ),
  },
  {
    path: "password-reset",
    element: <PasswordReset />,
  },
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard/reports" replace />,
      },
      {
        path: "reports",
        element: <Reports />,
        children: [
          {
            path: "/",
            element: <ReportsOverview />,
          },
          {
            path: "sales",
            element: <ReportsSales />,
          },
        ],
      },
      {
        path: "account",
        element: <Account />,
        children: [
          {
            path: "/",
            element: <AccountGeneral />,
          },
          {
            path: "notifications",
            element: <AccountNotifications />,
          },
          {
            path: "team",
            element: <OrganizationTeam />,
          },
        ],
      },
      {
        path: "customers",
        children: [
          {
            path: "/",
            element: <Customers />,
          },
          {
            path: ":customerId",
            element: <Customer />,
            children: [
              {
                path: "/",
                element: <CustomerSummary />,
              },
              {
                path: "activity",
                element: <CustomerActivity />,
              },
              {
                path: "orders",
                element: <CustomerOrders />,
              },
            ],
          },
        ],
      },
      {
        path: "orders",
        children: [
          {
            path: "/",
            element: <Orders />,
          },
          {
            path: ":orderId",
            element: <Order />,
          },
        ],
      },
      {
        path: "organization",
        element: <Organization />,
        children: [
          {
            path: "/",
            element: <OrganizationGeneral />,
          },
          {
            path: "/team",
            element: <OrganizationTeam />,
          },
          {
            path: "/billing",
            element: <OrganizationBilling />,
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            path: "/",
            element: <Products />,
          },
          {
            path: ":productId",
            element: <Product />,
            children: [
              {
                path: "/",
                element: <ProductSummary />,
              },
              {
                path: "analytics",
                element: <ProductAnalytics />,
              },
              {
                path: "inventory",
                element: <ProductInventory />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "docs",
    children: [
      {
        path: "/",
        element: <Navigate to="/docs/overview/welcome" replace />,
      },
      {
        path: "*",
        element: <Docs />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
