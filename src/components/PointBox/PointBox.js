import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
    // width: 100
  },
  paper: {
    width: 40,
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  },
  1: {
    borderLeft: "5px solid #4685EB",
  },
  2: {
    borderLeft: "5px solid #0092B9",
  },
  3: {
    borderLeft: "5px solid #C07500",
  },

}));

function PointBox({ points, caption, color }) {
  const classes = useStyles();

  return (
    <Paper className={`${classes.paper} ${classes[color]}`}>
      <Grid container direction="column">
        <Typography justify="center" align="center" variant="h5">
          <Box fontWeight="fontWeightBold">{points}</Box>
        </Typography>
        <Typography justify="center" align="center" variant="caption" color="textSecondary">
        <Box fontSize={10} fontWeight="fontWeightMedium">{caption}</Box>
        </Typography>
      </Grid>
    </Paper>
  );
}

PointBox.propTypes = {
  points: PropTypes.number,
  caption: PropTypes.string.isRequired
};

export default PointBox;
