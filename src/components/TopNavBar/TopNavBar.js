import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
  }
}));

export default function TopNavBar({ homeLink, handleOnClick, iconsToShow }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => handleOnClick(homeLink)}
          >
            Petangle
          </Typography>
          <div className={classes.menu}>
            {iconsToShow.map(icon => {
              if (icon.label !== "Home") {
                return (
                  <Button
                    key={icon.label}
                    color="inherit"
                    onClick={() => handleOnClick(icon.to)}
                  >
                    {icon.label}
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
  iconsToShow: PropTypes.array.isRequired
};
