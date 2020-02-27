import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFirebase } from "react-redux-firebase";

import { VerifyForm } from "../../components";
import { sendVerification } from "../../firebase/crud";
import { useLanguage } from "../../utils/customHooks";

function VerifyFormContainer() {
  const firebase = useFirebase();
  const locale = useLanguage();

  return <VerifyForm locale={locale} sendVerification={() => sendVerification(firebase)} />;
}

export default VerifyFormContainer;
