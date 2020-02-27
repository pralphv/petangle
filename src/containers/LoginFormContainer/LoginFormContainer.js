import React from "react";
import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import { LoginForm } from "../../components";
import { useLanguage } from "../../utils/customHooks";

export default function LoginFormContainer() {
  const history = useHistory();
  const firebase = useFirebase();
  const locale = useLanguage();

  return <LoginForm login={firebase.login} history={history} locale={locale} />;
}
