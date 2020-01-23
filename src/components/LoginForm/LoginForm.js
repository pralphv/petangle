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

export default function LoginForm({ login, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState(errorInitState);

  const classes = useStyles();

  function resetErrorState() {
    setError(errorInitState);
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
      <BoldTitle text="Welcome back!" />
      <form onSubmit={handleOnSubmit} noValidate className={classes.form}>
        <TextField
          className={classes.fieldWidth}
          required
          label="Email"
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <TextField
          className={classes.fieldWidth}
          required
          autoComplete="current-password"
          label="Password"
          type="password"
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <CustomButton text="Login" />
      </form>
      <ErrorText text={error} />
      <Grid container justify="space-between">
        <Link to={PAGE_FORGOT_PW} className={classes.link}>
          <Typography variant="caption" align="left" color="primary">
            Forgot password?
          </Typography>
        </Link>
        <Link to={PAGE_REGISTER} className={classes.link}>
          <Typography variant="caption" align="right" color="primary">
            Register
          </Typography>
        </Link>
      </Grid>
    </div>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
