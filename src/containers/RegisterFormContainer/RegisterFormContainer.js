import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import { RegisterForm } from "../../components";

export default function RegisterFormContainer() {
  const history = useHistory();
  const firebase = useFirebase();
  return (
    <RegisterForm
      firebase={firebase}
      history={history}
    />
  );
}
