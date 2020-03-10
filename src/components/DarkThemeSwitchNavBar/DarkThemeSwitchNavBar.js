import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center"
  }
}));

export default function DarkThemeSwitchNavBar({ theme, changeTheme }) {
  const classes = useStyles();
  return (
    <span>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={changeTheme}
        color="inherit"
      >
        {theme === "dark"? <BrightnessHighIcon /> : <Brightness4Icon/>}
      </Button>
    </span>
  );
}
DarkThemeSwitchNavBar.propTypes = {
  theme: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired
};
