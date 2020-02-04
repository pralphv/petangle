import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import PetsIcon from "@material-ui/icons/Pets";

const useStylesP = makeStyles(theme => ({
  bgPaws: {
    position: "fixed",
    zIndex: -1,
    fontSize: "6em",
    transform: "rotate(-30deg)",
    color: "#ADE0E4"
  }
}));

function Paws({ left, bottom }) {
  const classes = useStylesP();
  return (
      <PetsIcon
        className={classes.bgPaws}
        style={{ left: left, bottom: bottom }}
      />
  );
}

export default function BackgroundPaws() {
  return <div>
      <Paws left="5%" bottom="8%" />
      <Paws left="80%" bottom="70%" />
      <Paws left="7%" bottom="60%" />
      <Paws left="65%" bottom="5%" />
      </div>;
}
Paws.propTypes = {};
