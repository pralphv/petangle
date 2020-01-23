import React from "react";
import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import { LoginForm } from "../../components";

export default function LoginFormContainer() {
  const history = useHistory();
  const firebase = useFirebase();

  return <LoginForm login={firebase.login} history={history} />;
}
