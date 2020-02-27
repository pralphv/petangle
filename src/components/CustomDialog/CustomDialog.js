import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useLanguage } from "../../utils/customHooks";

const CANCEL_TEXT = {
  en: "Cancel",
  zh: "取消",
  jp: "キャンセル"
};

const CONFIRM_TEXT = {
  en: "Confirm",
  zh: "確定",
  jp: "確認"
};

export default function CustomDialog({
  title,
  body,
  open,
  handleClose,
  handleConfirm
}) {
  const locale = useLanguage() || "en";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {CANCEL_TEXT[locale]}
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          autoFocus
        >
          {CONFIRM_TEXT[locale]}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
