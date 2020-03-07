import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: "1px solid #e0e0e0",
    padding: 0,
    margin: 0
  },
  head: {
    background: "#f6f6f6"
  },
  body: {
    background: "#fff"
  },
  paddings: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(0)
  }
}));

function SettingsRow({
  text,
  rightSideOption: RightSideOption,
  head = false,
  onClick = null
}) {
  const classes = useStyles();
  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.head]: head,
        [classes.body]: !head
      })}
    >
      <Grid
        container
        className={classes.paddings}
        // justify="center"
        alignItems="center"
        onClick={onClick}
      >
        <Grid item xs={9}>
          <Typography>{text}</Typography>
        </Grid>
        {RightSideOption && (
          <Grid item xs={3}>
            <RightSideOption />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
SettingsRow.propTypes = {
  text: PropTypes.string.isRequired,
  rightSideOption: PropTypes.func
};

export default SettingsRow;
