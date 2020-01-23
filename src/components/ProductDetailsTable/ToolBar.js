import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const useToolbarStyles = makeStyles(theme => ({
  root: {},
  arrow: {
    marginLeft: -30
  }
}));

export default function EnhancedTableToolbar({ title, history }) {
  const classes = useToolbarStyles();
  function goBack() {
    const currentUrl = window.location.href;
    history.back();
  }
  return (
    <Toolbar className={classes.root}>
      <Tooltip title="Back" className={classes.arrow} onClick={goBack}>
        <IconButton aria-label="back">
          <ArrowBackIosIcon />
        </IconButton>
      </Tooltip>

      <Typography align="center" className={classes.title} variant="h6">
        {title}
      </Typography>
    </Toolbar>
  );
}
