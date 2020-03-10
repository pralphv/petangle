import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  LoadingSpinner,
  CustomButton,
  BoldTitle,
  ErrorText
} from "../../components";

import {
  PAGE_HOME,
  PAGE_REGISTER,
  PAGE_FORGOT_PW
} from "../../layouts/constants";
import { MISC_LANG } from "../../utils/constants";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  link: {
    textDecoration: "none"
  },
  form: {
    marginTop: 30,
    marginBottom: 50
  },
  fieldWidth: {
    width: "100%"
  }
}));

const errorInitState = "";

const WELCOME = {
  en: "Welcome back!",
  zh: "歡迎回來!",
  jp: "お帰りなさい!"
};

const REGISTER = {
  en: "Register",
  zh: "登錄",
  jp: "登録"
};

const FORGOT_PW = {
  en: "Forgot password",
  zh: "忘記密碼",
  jp: "パスワードを忘れですか？"
};

const LOGIN = {
  en: "Login",
  zh: "登入",
  jp: "ログイン"
};

const PASSWORD = {
  en: "Password",
  zh: "密碼",
  jp: "パスワード"
};

export default function LoginForm({ login, history, locale }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState(errorInitState);

  const classes = useStyles();

  function resetErrorState() {
    setError(errorInitState);
  }

  function changeLanguageUrl(path) {
    path = locale ? `/${locale}${path}` : path
    return path
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    resetErrorState();
    if (!email || !password) {
      return;
    }
    setLoggingIn(true);
    try {
      const resp = await login({ email, password });
      history.push(PAGE_HOME);
    } catch (error) {
      setError(error.message);
    }
    setLoggingIn(false);
  }

  return (
    <div>
      {loggingIn && <LoadingSpinner />}
      <BoldTitle text={WELCOME[locale]} />
      <form onSubmit={handleOnSubmit} noValidate className={classes.form}>
        <TextField
          className={classes.fieldWidth}
          required
          label={MISC_LANG.email[locale]}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <TextField
          className={classes.fieldWidth}
          required
          autoComplete="current-password"
          label={PASSWORD[locale]}
          type="password"
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <CustomButton text={LOGIN[locale]} />
      </form>
      <ErrorText text={error} />
      <Grid container justify="space-between">
        <Link
          to={changeLanguageUrl(PAGE_FORGOT_PW)}
          className={classes.link}
        >
          <Typography variant="caption" align="left" color="secondary">
            {FORGOT_PW[locale]}
          </Typography>
        </Link>
        <Link
          to={changeLanguageUrl(PAGE_REGISTER)}
          className={classes.link}
        >
          <Typography variant="caption" align="right" color="secondary">
            {REGISTER[locale]}
          </Typography>
        </Link>
      </Grid>
    </div>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};
