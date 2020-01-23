import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center"
  }
}));

export default function CustomButton({ text }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>

    <Button
      type="submit"
      color="primary"
      variant="contained"
      classes={classes}
      >
      {text}
    </Button>
      </div>
  );
}
