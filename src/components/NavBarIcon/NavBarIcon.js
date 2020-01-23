import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  removeOutline: {
    outline: "none"
  }
}));

export default function NavBarIcon({ to, src, alt }) {
  const classes = useStyles();
  return (
    <Link to={to}>
      <HomeIcon/>
    </Link>
  );
}

NavBarIcon.propTypes = {
  handleOnSubmitRedux: PropTypes.func.isRequired
};
