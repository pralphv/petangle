import React from "react";
import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import { RegisterForm } from "../../components";
import { useLanguage } from "../../utils/customHooks";

export default function RegisterFormContainer() {
  const history = useHistory();
  const firebase = useFirebase();
  const locale = useLanguage();

  return (
    <RegisterForm
      firebase={firebase}
      history={history}
      locale={locale}
    />
  );
}
