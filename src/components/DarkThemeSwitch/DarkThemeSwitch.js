import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center"
  }
}));

export default function DarkThemeSwitch({ theme, changeTheme }) {
  const classes = useStyles();
  return (
    <Switch
      color="primary"
      checked={theme === "dark" ? true : false}
      onChange={changeTheme}
      value="checkedA"
      // inputProps={{ "aria-label": "secondary checkbox" }}
    />
  );
}
DarkThemeSwitch.propTypes = {
  theme: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired
};
