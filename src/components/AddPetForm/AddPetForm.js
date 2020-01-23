import React, { useState } from "react";

import { Formik } from "formik";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

import { INITIAL_STATE } from "./constants";
import { petValidationSchema } from "./yupValidation";
import { useStyles } from "../../utils/styles";
import {
  FormikCustomSelect,
  NotificationPopUp,
  LoadingSpinner,
  CustomButton,
  BoldTitle
} from "../../components";
import { addPet, addPetsCount } from "../../firebase/crud";

export default function AddProductForm({ userId, firebase }) {
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
      <BoldTitle text="Add a Pet" />
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
                  label="Select animal *"
                />
                <br />
                <Field
                  className={classes.customInput}
                  label="Name *"
                  name="n"
                  id="n"
                  autoComplete="off"
                  component={TextField}
                />
                <br />
                <br />
                <CustomButton text="Submit" />
              </form>
            </div>
          );
        }}
      </Formik>
      <NotificationPopUp
        active={notificationOpen}
        setState={setNotificationOpen}
        text="Pet added successfully"
      />
    </div>
  );
}
