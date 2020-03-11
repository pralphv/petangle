import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { fade, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grid from "@material-ui/core/Grid";
import { faCat, faDog, faTimes } from "@fortawesome/free-solid-svg-icons";

const CustomInputBase = withStyles(theme => ({
  input: {
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
    padding: theme.spacing(2)
  },
  x: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: `${fade("#eeeeee", 0.8)} 0 0 0 0.15rem`,
      opacity: "50%"
    }
  },
  icon: {
    color: theme.palette.type === "dark" ? "#fff" : "#00273C"
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
    <Grid container className={classes.root} alignItems="center">
      <Grid item xs={1}>
        <FontAwesomeIcon className={classes.icon} icon={Icon} />
      </Grid>
      <Grid item xs={10}>
        <CustomInputBase
          autoComplete="off"
          defaultValue={value}
          onBlur={handleNameOnBlur}
          id={id}
        />
      </Grid>
      <Grid item xs={1}>
        <FontAwesomeIcon
          className={classes.x}
          icon={faTimes}
          onClick={handleDeleteOnClick}
        />
      </Grid>
    </Grid>
  );
}
