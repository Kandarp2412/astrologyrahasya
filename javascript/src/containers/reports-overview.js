import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Grid } from "@material-ui/core";
import { Bills } from "../components/reports/bills";
import { LatestOrders } from "../components/reports/latest-orders";
import { Notifications } from "../components/reports/notifications";
import { OrdersOverview } from "../components/reports/orders-overview";
import { SummaryItem } from "../components/reports/summary-item";
import { Cube as CubeIcon } from "../icons/cube";
import { ShoppingCart as ShoppingCartIcon } from "../icons/shopping-cart";
import { CustomCreditCard as CustomCreditCardIcon } from "../icons/custom-credit-card";
import gtm from "../lib/gtm";
import BirthChart from "../components/chart/BirthChart";
import ProgressionChart from "../components/chart/ProgressionChart";
import Dashboard from "../components/chart/Dashboard";

const stats = [
  {
    content: "3450",
    icon: ShoppingCartIcon,
    label: "Orders",
    linkHref: "/dashboard/orders",
    linkLabel: "Orders",
  },
  {
    content: "68",
    icon: CubeIcon,
    label: "Products",
    linkHref: "/dashboard/customers",
    linkLabel: "Products",
  },
  {
    content: "3120",
    icon: CustomCreditCardIcon,
    label: "Transactions",
    linkHref: "#",
    linkLabel: "Transactions",
  },
];

export const ReportsOverview = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Reports Overview | Carpatin Retail Dashboard</title>
      </Helmet>
      <Box sx={{ backgroundColor: "background.default" }}>
        <Dashboard />
        {/* <Grid item md={4} xs={12}>
          <BirthChart />
        </Grid>
        <Grid item md={4} xs={12}>
          <ProgressionChart />
        </Grid> */}

        {/* <Grid container spacing={3}>
          <Grid item xs={12}>
            <Notifications />
          </Grid>
          {stats.map((item) => (
          ))}
          <Grid item xs={12}>
            <Bills />
          </Grid>
          <Grid item md={6} xs={12}>
            <OrdersOverview />
          </Grid>
          <Grid item md={6} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid> */}
      </Box>
    </>
  );
};
