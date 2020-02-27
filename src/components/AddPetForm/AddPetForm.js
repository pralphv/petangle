import React, { useState } from "react";
import PropTypes from "prop-types";

import { Formik } from "formik";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

import { INITIAL_STATE } from "./constants";
import { petValidationSchema } from "./yupValidation";
import { useStyles } from "../../utils/styles";
import { MISC_LANG, SUCCESS_TEXT } from "../../utils/constants";
import {
  FormikCustomSelect,
  NotificationPopUp,
  LoadingSpinner,
  CustomButton,
  BoldTitle
} from "../../components";
import { addPet, addPetsCount } from "../../firebase/crud";

const TITLE_TEXT = {
  jp: "ペット追加",
  en: "Add a Pet",
  zh: "加寵物"
}

export default function AddProductForm({ userId, firebase, locale }) {
  const [registerError, setRegisterError] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const classes = useStyles();

  async function handleOnSubmit(form, action) {
    setRegisterError("");
    form["a"] = form["a"].toLowerCase();
    try {
      const isSuccessful = await addPet(firebase, userId, form);
    } catch (error) {
      console.log(error);
      setRegisterError(
        "There seems to be a server error. Please try again later."
      );
    } finally {
      addPetsCount(firebase);
      setNotificationOpen(true);
      action.resetForm();
    }
  }

  return (
    <div>
      <BoldTitle text={TITLE_TEXT[locale]} />
      <Formik
        initialValues={INITIAL_STATE}
        onSubmit={(form, action) => handleOnSubmit(form, action)}
        validationSchema={petValidationSchema}
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
                <FormikCustomSelect
                  name="a"
                  value={values.a || ""}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  options={["cat", "dog"]}
                  label={`${MISC_LANG.a[locale]} *`}
                />
                <br />
                <Field
                  className={classes.customInput}
                  label={`${MISC_LANG.name[locale]} *`}
                  name="n"
                  id="n"
                  autoComplete="off"
                  component={TextField}
                />
                <br />
                <br />
                <CustomButton text={MISC_LANG.submit[locale]} />
              </form>
            </div>
          );
        }}
      </Formik>
      <NotificationPopUp
        active={notificationOpen}
        setState={setNotificationOpen}
        text={SUCCESS_TEXT[locale]}
      />
    </div>
  );
}

AddProductForm.propTypes = {
  userId: PropTypes.string.isRequired,
  firebase: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};
