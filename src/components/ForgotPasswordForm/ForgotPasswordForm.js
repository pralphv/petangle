import React, { useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
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

const errorInitState = "";

export default function ForgotPasswordForm({ firebase }) {
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
      <BoldTitle text="Forgot Password?" />
      <form onSubmit={handleOnSubmit} noValidate>
        <TextField
          className={classes.customInput}
          required
          label="Email"
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <CustomButton text="Submit"/>
        <ErrorText text={error} />
      </form>
      <NotificationPopUp
        active={notificationOpen}
        setState={setNotificationOpen}
        text="Password reset email has been sent."
      />
    </div>
  );
}

ForgotPasswordForm.propTypes = {
  firebase: PropTypes.object.isRequired
};
