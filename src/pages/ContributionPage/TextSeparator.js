import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: 12
  }
}));
function TextSeparator({ text }) {
  const classes = useStyles();

  return (
    <Typography
    //   variant="caption"
      color="textSecondary"
      className={classes.root}
    >
      {text}
    </Typography>
  );
}

export default TextSeparator;
