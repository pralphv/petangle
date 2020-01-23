import React from "react";
import { useFirebase } from "react-redux-firebase";

import { ForgotPasswordForm } from "../../components";

export default function ForgotPasswordContainer() {
  const firebase = useFirebase();

  return <ForgotPasswordForm firebase={firebase} />;
}
