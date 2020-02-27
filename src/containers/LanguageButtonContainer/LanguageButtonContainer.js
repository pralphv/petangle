import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { LanguageButton } from "../../components";
import { changeLanguageActions } from "../../state/language";
import { useLanguage } from "../../utils/customHooks";
import { convertUrlToLanguageUrl } from "../../utils/helper";

export const LanguageButtonContainer = ({ changeLanguage }) => {
  const history = useHistory();
  const currentPath = history.location.pathname;
  const language = useLanguage();

  function push(nextLanguage) {
    const newPath = convertUrlToLanguageUrl(currentPath, nextLanguage);
    history.push(newPath);
  }

  return (
    <LanguageButton
      language={language}
      changeLanguage={changeLanguage}
      push={push}
    />
  );
};

LanguageButtonContainer.propTypes = {
  changeLanguage: PropTypes.func.isRequired
};

export default connect(null, {
  changeLanguage: changeLanguageActions.changeLanguage
})(LanguageButtonContainer);
