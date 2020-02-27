import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FlagIcon from "@material-ui/icons/Flag";
import Modal from "@material-ui/core/Modal";
import { Input } from "@material-ui/core";

import { CustomButton } from "..";
import { useLanguage } from "../../utils/customHooks";
import { MISC_LANG, NUTRITION_LANG } from "../../utils/constants";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    width: "70%",
    transform: "translate(-50%, -50%)"
  }
}));

const TEXT = {
  en: "Report",
  jp: "レポート",
  zh: "報告"
};

const THANKS = {
  en: "Thank you for helping us!",
  zh: "謝謝你的幫助!",
  jp: "ご協力いただきありがとうございます。"
};

const CONTENT_1 = {
  en:
    "If you think there is anything wrong for this product's data, please press 'Submit.' We will check and do the corrections.",
  zh: "如果你認為這產品的資料有誤，請按'提交'。我們會橡查及進行修改。",
  jp:
    "この製品についての情報が間違っていると思われる場合，「提出」ボタンをクリックしてください。 その情報をチェックして修正します。"
};

const CONTENT_2 = {
  en:
    "We hate to bother you further, but it would be great if you could also provide a link to this product's official website!",
  zh: "我們很感澈你的幫助，但如果你能提供這產品的官方網站連結會減少我們很多功夫!",
  jp: "ご迷惑をおかけしますが，この製品の公式サイトのリンクを提供していただければ助かります！"
};

function ReportButton() {
  const locale = useLanguage();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="subtitle1">
        <IconButton
          onClick={handleOpen}
          aria-label="save"
          size="small"
          style={{ fontSize: 17, width: 100 }}
        >
          <FlagIcon /> {TEXT[locale]}
        </IconButton>
      </Typography>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <Typography>{THANKS[locale]}</Typography>
          <br />
          <Typography>{CONTENT_1[locale]}</Typography>
          <br />
          <Typography>{CONTENT_2[locale]}</Typography>
          <br />

          <form>
            <div>
              <Input placeholder={NUTRITION_LANG.li[locale]} type="text" autoComplete="off" />
              <br />
              <br />
              <div className={"report-button-container "}>
                <CustomButton text={MISC_LANG.submit[locale]} />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ReportButton;
