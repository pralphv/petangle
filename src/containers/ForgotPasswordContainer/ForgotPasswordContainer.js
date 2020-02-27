import React from "react";
import { useFirebase } from "react-redux-firebase";

import { ForgotPasswordForm } from "../../components";
import { useLanguage } from "../../utils/customHooks";

export default function ForgotPasswordContainer() {
  const firebase = useFirebase();
  const locale = useLanguage();

  return <ForgotPasswordForm locale={locale} firebase={firebase} />;
}
