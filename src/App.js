import React from "react";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import firebase from "./firebase";
import store from "./configureStore";
import MainLayout from "./layouts/mainLayout";

import "./styles.css";

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users"
  // useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0095AC"
    },
    secondary: {
      main: "#387adf"
    }
  },
  overrides: {}
});

// store.dispatch()

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ThemeProvider theme={theme}>
          <MainLayout />
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
