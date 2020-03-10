import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function BoldTitle({ text }) {
  return (
    <Typography color="secondary" variant="h5" gutterBottom>
      <Box fontWeight="fontWeightBold">{text}</Box>
    </Typography>
  );
}

BoldTitle.propTypes = {
  text: PropTypes.string.isRequired
};
