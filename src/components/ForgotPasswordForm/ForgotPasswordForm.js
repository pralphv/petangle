import React, { useState } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

import {
  LoadingSpinner,
  NotificationPopUp,
  BoldTitle,
  CustomButton,
  ErrorText
} from "../../components";
import { sendPasswordResetEmail } from "../../firebase/crud";
import { validateEmail } from "../../utils/helper";
import { useStyles } from "../../utils/styles";
import { MISC_LANG } from "../../utils/constants";

const RESET_PW = {
  en: "Reset Password",
  zh: "重設密碼",
  jp: "パスワードをリセット"
};

const SUCCESS = {
  en: "Password reset email has been sent",
  zh: "已發出電郵重設密碼",
  jp: "パスワードをリセットのメールは送信されました"
};

const errorInitState = "";

export default function ForgotPasswordForm({ firebase, locale }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(errorInitState);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const classes = useStyles();

  function resetErrorState() {
    setError(errorInitState);
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    resetErrorState();
    if (!email) {
      return;
    }
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    setSubmitting(true);
    try {
      await sendPasswordResetEmail(firebase, email);
      setNotificationOpen(true);
    } catch (error) {
      setError(error.message);
    }
    setSubmitting(false);
  }

  return (
    <div>
      {submitting && <LoadingSpinner />}
      <BoldTitle text={RESET_PW[locale]} />
      <form onSubmit={handleOnSubmit} noValidate>
        <TextField
          className={classes.customInput}
          required
          label={MISC_LANG.email[locale]}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <CustomButton text={MISC_LANG.submit[locale]} />
        <ErrorText text={error} />
      </form>
      <NotificationPopUp
        active={notificationOpen}
        setState={setNotificationOpen}
        text={SUCCESS[locale]}
      />
    </div>
  );
}

ForgotPasswordForm.propTypes = {
  firebase: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};
