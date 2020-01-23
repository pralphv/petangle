import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import HomeIcon from "@material-ui/icons/Home";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PetsIcon from "@material-ui/icons/Pets";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssessmentIcon from "@material-ui/icons/Assessment";

import { AddFAB, TopNavBar } from "../components";
import { useLoggedIn } from "../utils/customHooks";
import { logout } from "../firebase/crud";
import * as constants from "./constants";

const useStyles = makeStyles(theme => ({
  navBarBackground: {
    background: "#34B0D8",
    bottom: 0,
    position: "fixed",
    width: "100%",
    zIndex: 4500
  }
}));

const iconStyleOveride = makeStyles(theme => ({
  root: {
    minWidth: 60,
    color: "#005A70",
    "&$selected": {
      color: "#004CA1"
    }
  },
  selected: {}
}));

const loggedInIcons = [
  { label: "Pets", icon: PetsIcon, to: constants.PAGE_MY_PETS },
  { label: "Products", icon: TurnedInIcon, to: constants.PAGE_MY_PRODUCTS },
  { label: "Home", icon: HomeIcon, to: constants.PAGE_HOME },
  {
    label: "Contribution",
    icon: AssessmentIcon,
    to: constants.PAGE_CONTRIBUTION
  },
  { label: "Logout", icon: ExitToAppIcon, to: "/logout" }
];

const notLoggedInIcons = [
  { label: "Login", icon: AccountCircleIcon, to: constants.PAGE_LOGIN },
  { label: "Home", icon: HomeIcon, to: constants.PAGE_HOME }
];

export default function Navigation({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const firebase = useFirebase();

  const iconStyleOverideClasses = iconStyleOveride();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isLoggedIn = useLoggedIn();
  const [value, setValue] = React.useState("recents");

  const iconsToShow = isLoggedIn ? loggedInIcons : notLoggedInIcons;

  function handleChange(e, newValue) {
    setValue(newValue);
  }

  function handleOnClick(path) {
    if (path === "/logout") {
      logout(firebase);
    } else {
      history.push(path);
    }
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      {isLoggedIn && <AddFAB history={history} />}
      {isMobile ? (
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className={classes.navBarBackground}
          showLabels
        >
          {iconsToShow.map(icon => (
            <BottomNavigationAction
              classes={iconStyleOverideClasses}
              label={icon.label}
              icon={<icon.icon />}
              key={icon.label}
              onClick={() => handleOnClick(icon.to)}
            />
          ))}
        </BottomNavigation>
      ) : (
        <TopNavBar
          homeLink={constants.PAGE_HOME}
          handleOnClick={handleOnClick}
          iconsToShow={iconsToShow}
        />
      )}
      {children}
    </Grid>
  );
}

Navigation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
