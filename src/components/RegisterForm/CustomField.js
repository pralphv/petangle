import React from "react";

import { Field } from "formik";
import { TextField } from "formik-material-ui";

import { FORM_FIELD_ORDER } from "./constants";
import { useStyles } from "../../utils/styles";
import { validateEmail } from "../../utils/helper";

export function CustomField({ name }) {
  const classes = useStyles();
  const label = FORM_FIELD_ORDER[name];
  const validateMap = { email: validateEmail };

  return (
    <div>
      <Field
        className={classes.customInput}
        label={label}
        name={name}
        id={name}
        autoComplete="off"
        validate={validateMap[name]}
        component={TextField}
        type={name.includes("password") ? "password" : "text"}
        required
      />
    </div>
  );
}
