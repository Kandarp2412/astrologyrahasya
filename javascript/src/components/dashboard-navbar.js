import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@emotion/react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ChevronDown as ChevronDownIcon } from "../icons/chevron-down";
import { useSettings } from "../contexts/settings-context";
import { Moon as MoonIcon } from "../icons/moon";
import { Sun as SunIcon } from "../icons/sun";
import { AccountPopover } from "./account-popover";
import { OrganizationPopover } from "./organization-popover";
import { Logo } from "./logo";
import { DashboardNavbarMenu } from "./dashboard-navbar-menu";
import LanguageSelector from "./LanguageSelector";
import { NotificationsPopover } from "./notifications-popover";
// import SettingsIcon from '@material-ui/icons/Settings';
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import TranslateOutlinedIcon from "@material-ui/icons/TranslateOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "../containers/Report.css";
import DarkLogo from "../icons/logo-RVA.png";
import { LanguageContext } from "./Language";

const organizations = [
  {
    id: "6039124832",
    name: "RVA Software",
  },
];

export const DashboardNavbar = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { settings, saveSettings } = useSettings();
  const [openMenu, setOpenMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(settings.theme === "dark");
  const [currentOrganization, setCurrentOrganization] = useState(organizations[0]);
  const [languageOption, setLanguageOption] = useState(false);
  const [language, setLanguage] = useState("English");
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleSwitchTheme = () => {
    saveSettings({
      ...settings,
      theme: settings.theme === "light" ? "dark" : "light",
    });

    setDarkMode(settings.theme === "light");
  };

  const handleLanguage = () => {
    setLanguageOption(!languageOption);
    console.log(languageOption);
  };

  const handleLanguageChange = (e) => {
    // console.log(e.target.lastChild.data);
    userLanguageChange(e.target.lastChild === null ? "English" : e.target.lastChild.data);
    // console.log(e.target.name.length);
    console.log(userLanguage);
  };

  const handleOrganizationChange = (organizationId) => {
    const newOrganization = organizations.find(
      (organization) => organization.id === organizationId
    );

    if (!newOrganization) {
      return;
    }

    setCurrentOrganization(newOrganization);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const handleClose = (e, lang) => {
    setLanguage(lang);
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar elevation={0} sx={{ backgroundColor: darkMode ? "#111318" : "white" }}>
        <Toolbar
          disableGutters
          sx={{
            alignItems: "center",
            display: "flex",
            minHeight: 64,
            px: 3,
            py: 1,
          }}
          // style={{}}
        >
          <Button
            sx={{
              backgroundColor: "transparent",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Logo emblemOnly variant="light" />
          </Button>

          <Button
            sx={{
              // color: "primary.contrastText",
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            {darkMode ? (
              <img src={DarkLogo} width="50px" height="50px" />
            ) : (
              <img
                src="https://www.rahasyavedicastrology.com/assets/img/RVALogo.png"
                width="50px"
                height="50px"
                sx={{
                  display: {
                    xs: "flex",
                    md: "none",
                  },
                }}
              />
            )}
          </Button>

          <Divider
            flexItem
            orientation="vertical"
            sx={{
              borderColor: "rgba(255,255,255,0.1)",
              mx: 3,
            }}
          />

          <Button
            onClick={() => setOpenMenu(!openMenu)}
            sx={{
              // color: "primary.contrastText",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
            variant="text"
            style={{ color: darkMode ? "white" : "black" }}
          >
            RVA Software{" "}
            <ArrowDropDownOutlinedIcon
              sx={{
                ml: 2,
                transition: "transform 250ms",
                transform: openMenu ? "rotate(180deg)" : "none",
              }}
            />
          </Button>

          <DashboardNavbarMenu onClose={() => setOpenMenu(false)} open={mdDown && openMenu} />
          <Button
            endIcon={
              <ChevronDownIcon
                fontSize="small"
                sx={{
                  ml: 2,
                  transition: "transform 250ms",
                  transform: openMenu ? "rotate(180deg)" : "none",
                }}
              />
            }
            onClick={() => setOpenMenu(true)}
            sx={{
              // color: "primary.contrastText",
              display: {
                md: "none",
                xs: "flex",
              },
            }}
            variant="text"
          >
            Menu
          </Button>
          <Box sx={{ flexGrow: 1 }} />

          {/* <LanguageSelector/> */}

          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            sx={{
              // color: "primary.contrastText",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <TranslateOutlinedIcon
              style={{ color: darkMode ? "blue" : "gray", cursor: "pointer" }}
              onClick={handleLanguage}
              currentOrganization={currentOrganization}
              organizations={organizations}
            />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={(e) => handleLanguageChange(e)}
          >
            <MenuItem
              onClick={(e) => handleClose(e, "English")}
              style={{
                backgroundColor: language === "English" ? "lightblue" : "white",
              }}
              name="English"
            >
              English
            </MenuItem>
            {/* {console.log(language)} */}
            <MenuItem
              onClick={(e) => handleClose(e, "Hindi")}
              style={{ backgroundColor: language === "Hindi" ? "lightblue" : "white" }}
              name="Hindi"
            >
              Hindi
            </MenuItem>
            <MenuItem
              onClick={(e) => handleClose(e, "Tamil")}
              style={{ backgroundColor: language === "Tamil" ? "lightblue" : "white" }}
              name="Tamil"
            >
              Tamil
            </MenuItem>
            <MenuItem
              onClick={(e) => handleClose(e, "Telugu")}
              style={{ backgroundColor: language === "Telugu" ? "lightblue" : "white" }}
              name="Telugu"
            >
              Telugu
            </MenuItem>
            <MenuItem
              onClick={(e) => handleClose(e, "Kannada")}
              style={{ backgroundColor: language === "Kannada" ? "lightblue" : "white" }}
              name="Kannada"
            >
              Kannada
            </MenuItem>
            <MenuItem
              onClick={(e) => handleClose(e, "Malyalam")}
              style={{ backgroundColor: language === "Malyalam" ? "lightblue" : "white" }}
              name="Malyalam"
            >
              Malyalam
            </MenuItem>
          </Menu>

          {/* </select> */}
          <IconButton
            // color="inherit"
            onClick={handleSwitchTheme}
            sx={{
              display: {
                md: "inline-flex",
                xs: "none",
              },
              color: darkMode ? "white" : "gray",
            }}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </IconButton>
          <HelpOutlineOutlinedIcon
            style={{ color: darkMode ? "white" : "gray", marginRight: "10px" }}
            sx={{
              // color: "primary.contrastText",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          />
          <SettingsOutlinedIcon
            color="inherit"
            onClick={handleSwitchTheme}
            sx={{
              display: {
                md: "inline-flex",
                xs: "inline-flex",
              },
              color: darkMode ? "white" : "gray",
              marginRight: "10px",
            }}
          />

          <AppsOutlinedIcon
            style={{ color: darkMode ? "white" : "gray", marginRight: "10px" }}
            sx={{
              // color: "primary.contrastText",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          />
          {/* </div> */}

          {/* <NotificationsPopover sx={{ mx: 3 }} style={{color:"black"}}/> */}
          <AccountPopover
            currentOrganization={currentOrganization}
            // darkMode={darkMode}
            // onOrganizationChange={handleOrganizationChange}
            // onSwitchTheme={handleSwitchTheme}
            organizations={organizations}
          />
        </Toolbar>
        <Divider style={{ borderColor: "black" }} />
      </AppBar>
    </div>
  );
};
