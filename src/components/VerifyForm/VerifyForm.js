import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { NotificationPopUp } from "../../components";

const TITLE = {
  jp: "メールを確認していません！",
  en: "You have not verified your Email!",
  zh: "你還沒有確認電郵"
}

const RESEND = {
  jp: "再送する",
  en: "Resend",
  zh: "重發"
}

const VERIFY = {
  jp: "メールをご確認ください",
  en: "Please verify your email",
  zh: "請確認你的電郵"
}

export default function VerifyForm({ sendVerification, locale }) {
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
      <Typography>{TITLE[locale]}</Typography>
      <Button onClick={handleOnClick} disabled={disable}>
        {RESEND[locale]}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <NotificationPopUp
        active={notificationOpen}
        setState={setNotificationOpen}
        text={VERIFY[locale]}
      />
    </div>
  );
}
