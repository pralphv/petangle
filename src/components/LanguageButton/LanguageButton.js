import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TranslateIcon from "@material-ui/icons/Translate";

import { setLanguageLocalStorage } from "../../localStorageUtils";

const LANG_MAP = {
  en: "Eng",
  zh: "中文",
  jp: "日本語"
};

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(1)
  }
}));

export default function LanguageButton({ language, changeLanguage, push, showIcon=false }) {
  function handleClick(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClickItem(value) {
    changeLanguage(value);
    setLanguageLocalStorage(value);
    push(value);
    setAnchorEl(null);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  return (
    <span>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        {showIcon && <TranslateIcon className={classes.icon} />}
        {LANG_MAP[language]}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.entries(LANG_MAP).map(([key, value]) => (
          <MenuItem key={key} onClick={() => handleClickItem(key)}>
            {value}
          </MenuItem>
        ))}
      </Menu>
    </span>
  );
}

LanguageButton.propTypes = {
  language: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired
};
