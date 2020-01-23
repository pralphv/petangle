import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFirebase } from "react-redux-firebase";

import { VerifyForm } from "../../components";
import { sendVerification } from "../../firebase/crud";

function VerifyFormContainer() {
  const firebase = useFirebase();

  return <VerifyForm sendVerification={() => sendVerification(firebase)} />;
}

export default VerifyFormContainer;
