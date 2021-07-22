import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { gtmConfig } from "./config";
import { useSettings } from "./contexts/settings-context";
import { useAuth } from "./hooks/use-auth";
import gtm from "./lib/gtm";
import routes from "./routes";
import { createTheme } from "./theme";

export const App = () => {
  const content = useRoutes(routes);
  const { settings } = useSettings();
  const { isInitialized } = useAuth();

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  const theme = createTheme({
    mode: settings.theme,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isInitialized && content}
    </ThemeProvider>
  );
};
