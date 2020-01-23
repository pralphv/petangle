import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";

import { makeStyles } from "@material-ui/core/styles";

import { PAGE_HOME } from "../../layouts/constants";
import { INITIAL_STATE, FORM_FIELD_ORDER } from "./constants";
import { registerValidationSchema } from "./yupValidation";
import {
  LoadingSpinner,
  NotificationPopUp,
  CustomButton,
  BoldTitle,
  ErrorText
} from "../../components";
import { CustomField } from "./CustomField";
import {
  addUserCount,
  registerUser,
  sendVerification,
  addUserToContributionEndPoint
} from "../../firebase/crud";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  width: {
    width: 200
  }
}));

export default function RegisterForm({ firebase, history }) {
  const [registerError, setRegisterError] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);

  const classes = useStyles();

  async function handleOnSubmit(form, action) {
    setRegisterError("");
    const authUser = await registerUser(firebase, form.email, form.passwordOne);
    await addUserToContributionEndPoint(
      firebase,
      authUser.user.uid,
      form.username
    );

    try {
      await sendVerification(firebase);
      addUserCount(firebase);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setNotificationOpen(true);
      action.resetForm();
      history.push(PAGE_HOME);
    }
  }

  return (
    <div>
      <BoldTitle text="Join us"/>
      <Formik
        initialValues={INITIAL_STATE}
        onSubmit={(form, action) => handleOnSubmit(form, action)}
        validationSchema={registerValidationSchema}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
          } = props;
          return (
            <div>
              {isSubmitting && <LoadingSpinner />}
              <form onSubmit={handleSubmit}>
                {Object.keys(FORM_FIELD_ORDER).map(name => (
                  <CustomField name={name} key={name} />
                ))}
                <br />
                <CustomButton text="Submit" />
                <br />
                {registerError && (
                  <ErrorText text={registerError}/>
                )}
              </form>
            </div>
          );
        }}
      </Formik>
      <NotificationPopUp
        active={notificationOpen}
        setState={setNotificationOpen}
        text="Please verify your email."
      />
    </div>
  );
}

RegisterForm.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
