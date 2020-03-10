import React from "react";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import grey from "@material-ui/core/colors/grey";

import { getTheme } from "./localStorageUtils";
import firebase from "./firebase";
import store from "./configureStore";
import MainLayout from "./layouts/mainLayout";
import "./styles.css";

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users"
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
};

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const localStorageTheme = getTheme();
  let themeToUse;
  if (localStorageTheme) {
    themeToUse = localStorageTheme;
  } else {
    if (prefersDarkMode) {
      themeToUse = "dark";
    }
  }
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: themeToUse,
          background: {
            default: themeToUse === "dark" ? "#212121" : "#fff"
          },
          primary: {
            main: "#0095AC"
            // 333333

          },
          secondary: {
            main: "#60D0E8",
            // main: "#387adf",
            dark: "#60D0E8"
          },
          dark: {
            firstShade: grey[800],
            secondShade: grey[700],
            thirdShade: grey[600],
            fourthShade: grey[500],
            navBar: "#333"
          },
          white: "#fff",
          black: "#212121",
          link: "#82EFFF"

        },
        overrides: {}
      }),
    [prefersDarkMode]
  );

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout />
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
