import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { fade, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat, faDog, faTimes } from "@fortawesome/free-solid-svg-icons";

const CustomInputBase = withStyles(theme => ({
  input: {
    margin: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    width: 210,
    border: "0px",
    "&:focus": {
      boxShadow: `${fade("#eeeeee", 0.8)} 0 0 0 0.15rem`
    },
    "&:hover": {
      boxShadow: `${fade("#eeeeee", 0.8)} 0 0 0 0.15rem`
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
  },
  x: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: `${fade("#eeeeee", 0.8)} 0 0 0 0.15rem`,
      opacity: "50%"
    }
  },
  icon: {
    color: theme.palette.type === "dark"? "#fff": "#00273C"

  }
}));

const iconMap = {
  cat: faCat,
  dog: faDog
};

export default function PetNameInput({
  animal,
  value,
  handleNameOnBlur,
  id,
  handleDeleteOnClick
}) {
  const classes = useStyles();
  const Icon = iconMap[animal];

  return (
    <div className={classes.root}>
      <FontAwesomeIcon className={classes.icon} icon={Icon} />
      <CustomInputBase
        autoComplete="off"
        defaultValue={value}
        onBlur={handleNameOnBlur}
        id={id}
      />
      <FontAwesomeIcon
        className={classes.x}
        icon={faTimes}
        onClick={handleDeleteOnClick}
      />
    </div>
  );
}
