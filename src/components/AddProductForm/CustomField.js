import React from "react";

import { Field } from "formik";
import { TextField } from "formik-material-ui";

import { validateLink } from "./yupValidation";
import { FORM_FIELD_ORDER } from "./constants";
import { useStyles } from "../../utils/styles";

export function CustomField({ name }) {
  const classes = useStyles();

  const placeHolderMap = {
    li: "Product's official website"
  };
  const validateMap = { li: validateLink };
  const fullName = FORM_FIELD_ORDER[name];
  const isRequiredFields = ["f", "pro", "li", "cra", "wm", "fi"];
  const guaranteedAnalysis = ["f", "pro", "cra", "wm", "fi"];
  const isRequired = isRequiredFields.includes(name);
  const isGuaranteedAnalysis = guaranteedAnalysis.includes(name);
  const label = isRequired ? `${fullName} *` : fullName;

  // need a way to hint
  // <QuestionMarkAnnotation text="Fill as shown in Guaranteed Analysis" />

  return (
    <div>
      <Field
        className={classes.customInput}
        label={label}
        name={name}
        id={name}
        autoComplete="off"
        placeholder={placeHolderMap[name]}
        validate={validateMap[name]}
        component={TextField}
      />
    </div>
  );
}
