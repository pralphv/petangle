import React, { useState } from "react";

import HelpIcon from "@material-ui/icons/Help";
import { makeStyles } from "@material-ui/core/styles";
import { ClickAwayListener, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  helpIcon: {
    fontSize: 12,
    color: "#868686",
    "&:hover": {
      opacity: "80%"
    }
  },
  annotation: {
    position: "absolute",
    zIndex: 10,
    padding: "10px",
    background: "#0092B9",
    maxWidth: "120px",
    fontSize: "12px",
    marginTop: "-8px",
    marginLeft: "60px",
    wordBreak: "normal !important",
    color: "#fff",
    fontWeight: 600
  }
}));

export default function QuestionMarkAnnotation({ text }) {
  const classes = useStyles();
  const [showBox, setShowBox] = useState("none");

  function handleOnClick() {
    const value = showBox === "none" ? "block" : "none";
    setShowBox(value);
  }
  function handleOnClickAway() {
    setShowBox("none");
  }
  return (
    <sup>
      <ClickAwayListener onClickAway={handleOnClickAway}>
        <HelpIcon className={classes.helpIcon} onClick={handleOnClick} />
      </ClickAwayListener>
      <Typography style={{ display: showBox }} className={classes.annotation}>
        {text}
      </Typography>
    </sup>
  );
}
