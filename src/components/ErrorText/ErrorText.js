import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";

export default function ErrorText({ text }) {
  return (
    <Typography color="error" variant="caption">
      {text}
    </Typography>
  );
}

ErrorText.propTypes = {
  text: PropTypes.string.isRequired
};
