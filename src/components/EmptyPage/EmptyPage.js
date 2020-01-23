import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({}));

export default function EmptyPage({text}) {
  const classes = useStyles();

  return <Typography color="textSecondary">{text}</Typography>;
}
