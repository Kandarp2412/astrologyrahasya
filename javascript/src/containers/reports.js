import { useContext, useEffect, useRef, useState } from "react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Container,
  Divider,
  Tab,
  Grid,
  Tabs,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
// import { ActionsMenu } from "../components/actions-menu";
import gtm from "../lib/gtm";
import "./Report.css";
// import { LocalizationProvider, TimePicker } from "@material-ui/lab";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import TimePicker from "@material-ui/lab/TimePicker";
import { globalContext } from "../contexts/Context";
import BirthDetailsForm from "../components/chart/BirthDetailsForm";
// import { makeStyles } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';

const tabs = [
  {
    href: "/dashboard/reports",
    label: "Overview",
  },
  {
    href: "/dashboard/reports/sales",
    label: "Sales",
  },
];

const top100Films = [
  { title: "kandarp", year: 1994 },
  { title: "name", year: 1972 },
  { title: "abc", year: 1974 },
];

export const Reports = () => {
  const { chartType } = useContext(globalContext);
  const [advancedOption, setAdvancedOption] = useState(false);
  const birthDateVal = useRef("2021-04-24");

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [latitude, setLatidude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [timezone, setTimeZone] = useState("");
  const [value, setValue] = useState("");

  const location = useLocation();

  // console.log(chartType);

  const [age, setAge] = useState("South Indian");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  // const [range, setRange] = useState();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        flexGrow: 1,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <BirthDetailsForm />
            <Box sx={{ flexGrow: 1 }} />
          </Box>
        </Box>
        <Outlet />
      </Container>
    </Box>
  );
};
