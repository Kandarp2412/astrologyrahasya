import "simplebar/dist/simplebar.min.css";
import "nprogress/nprogress.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { AuthProvider } from "./contexts/jwt-auth-context";
import { SettingsProvider } from "./contexts/settings-context";
import { App } from "./app";
import { LanguageProvider } from "./components/Language";
import GlobalState from "./contexts/GlobalState";

ReactDOM.render(
  <StrictMode>
    <GlobalState>
      <LanguageProvider>
        <HelmetProvider>
          <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SettingsProvider>
                <AuthProvider>
                  <App />
                  <Toaster position="bottom-right" />
                </AuthProvider>
              </SettingsProvider>
            </LocalizationProvider>
          </BrowserRouter>
        </HelmetProvider>
      </LanguageProvider>
    </GlobalState>
  </StrictMode>,
  document.getElementById("root")
);
