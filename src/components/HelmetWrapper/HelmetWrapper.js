import React from "react";
import PropTypes from "prop-types";

import { Helmet } from "react-helmet";

export default function HelmetWrapper({ title, content }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
  );
}

HelmetWrapper.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};
