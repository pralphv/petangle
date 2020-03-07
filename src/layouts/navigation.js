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
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssessmentIcon from "@material-ui/icons/Assessment";

import { AddFAB, TopNavBar } from "../components";
import { useLoggedIn } from "../utils/customHooks";
import { logout } from "../firebase/crud";
import BackgroundPaws from "./backgroundPaws";
import * as constants from "./constants";
import { useLanguage } from "../utils/customHooks";
import { MISC_LANG } from "../utils/constants";

const useStyles = makeStyles(theme => ({
  navBarBackground: {
    background: "#34B0D8",
    bottom: 0,
    position: "fixed",
    width: "100%",
    zIndex: 4500,
    whiteSpace: "nowrap"
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

function chooseLoggedInIcons(isMobile) {
  let loggedInIcons = [
    {
      label: { en: "Pets", zh: "寵物", jp: "ペット" },
      icon: PetsIcon,
      to: constants.PAGE_MY_PETS
    },
    {
      label: { en: "Products", zh: "產品", jp: "製品" },
      icon: TurnedInIcon,
      to: constants.PAGE_MY_PRODUCTS
    },
    {
      label: { en: "Home", zh: "首頁", jp: "ホーム" },
      icon: HomeIcon,
      to: constants.PAGE_HOME
    },
    {
      label: { en: "Ranking", zh: "排名", jp: "ランキング" },
      icon: AssessmentIcon,
      to: constants.PAGE_CONTRIBUTION
    }
  ];

  if (isMobile) {
    loggedInIcons = [
      ...loggedInIcons,
      {
        label: MISC_LANG.setting,
        icon: SettingsIcon,
        to: "/settings"
      }
    ];
  } else {
    loggedInIcons = [
      ...loggedInIcons,
      {
        label: MISC_LANG.logout,
        icon: ExitToAppIcon,
        to: "/logout"
      }
    ];
  }
  return loggedInIcons;
}

const notLoggedInIcons = [
  {
    label: { en: "Log In", zh: "登入", jp: "ログイン" },
    icon: AccountCircleIcon,
    to: constants.PAGE_LOGIN
  },
  {
    label: { en: "Home", zh: "首頁", jp: "ホーム" },
    icon: HomeIcon,
    to: constants.PAGE_HOME
  },
  {
    label: MISC_LANG.setting,
    icon: SettingsIcon,
    to: "/settings"
  }
];

function showIcons(isLoggedIn, isMobile) {
  if (isLoggedIn) {
    return chooseLoggedInIcons(isMobile);
  } else {
    return notLoggedInIcons;
  }
}

export default function Navigation({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const firebase = useFirebase();
  const locale = useLanguage();

  const iconStyleOverideClasses = iconStyleOveride();
  const isMobile = useMediaQuery("(max-width:680px)");
  const isLoggedIn = useLoggedIn();
  const [value, setValue] = React.useState("recents");

  const iconsToShow = showIcons(isLoggedIn, isMobile);
  function handleChange(e, newValue) {
    setValue(newValue);
  }

  function handleOnClick(path) {
    if (path === "/logout") {
      logout(firebase);
    } else {
      path = locale ? `/${locale}${path}` : path;
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
      {isLoggedIn && <AddFAB history={history} locale={locale} />}
      <BackgroundPaws />
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
              label={icon.label[locale]}
              icon={<icon.icon />}
              key={icon.label.en}
              onClick={() => handleOnClick(icon.to)}
            />
          ))}
        </BottomNavigation>
      ) : (
        <TopNavBar
          homeLink={constants.PAGE_HOME}
          handleOnClick={handleOnClick}
          iconsToShow={iconsToShow}
          locale={locale}
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
