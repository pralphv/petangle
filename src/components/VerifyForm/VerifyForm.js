import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { NotificationPopUp } from "../../components";

export default function VerifyForm({ sendVerification }) {
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  async function handleOnClick() {
    setDisable(true);
    try {
      await sendVerification();
    } catch (error) {
      setError(error.message);
    } finally {
      setNotificationOpen(true);
    }
  }

  return (
    <div>
      <Typography>You have not verified your Email!</Typography>
      <Button onClick={handleOnClick} disabled={disable}>
        Resend
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <NotificationPopUp
        active={notificationOpen}
        setState={setNotificationOpen}
        text="Please verify your email."
      />
    </div>
  );
}
