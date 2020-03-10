import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { LanguageButtonContainer, DarkThemeSwitchContainer } from "../../containers";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    paddingBottom: 80
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
    marginLeft: "5%"
  },
  menu: {
    marginRight: "5%"
  },
  toolbar: {
    background: "#333"
  }
}));

const useNavBarStyle = makeStyles(theme => ({
  root: {
    background: theme.palette.type === "dark"? theme.palette.dark.navBar: theme.palette.primary
  }
}));

export default function TopNavBar({
  homeLink,
  handleOnClick,
  iconsToShow,
  locale
}) {
  const classes = useStyles();
  const navBarClasses = useNavBarStyle();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar classes={navBarClasses}>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => handleOnClick(homeLink)}
          >
            Petangle
          </Typography>
          <div className={classes.menu}>
            <DarkThemeSwitchContainer isNavBar={true} />
            <LanguageButtonContainer showIcon={true} />
            {iconsToShow.map(icon => {
              if (icon.label.en !== "Home") {
                return (
                  <Button
                    key={icon.label.en}
                    color="inherit"
                    onClick={() => handleOnClick(icon.to)}
                  >
                    {icon.label[locale]}
                  </Button>
                );
              }
            })}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopNavBar.propTypes = {
  homeLink: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  iconsToShow: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired
};
