import React, { useState } from "react";

import { Field } from "formik";
import { TextField } from "formik-material-ui";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { useStyles } from "../../utils/styles";

export function CustomAutoSuggestField({
  brand_or_product,
  options,
  label,
  name,
  setState,
  setFieldValue,
  value
}) {
  const classes = useStyles();

  function handleOnChange(value) {
    if (brand_or_product === "b") {
      setState(value);
    }
    setFieldValue(name, value);
  }

  function validateAlreadyExists(value) {
    if (!options) {
      // for when brand is not loaded yet
      return;
    }
    if (brand_or_product === "pr" && options.includes(value)) {
      // "includes" can be a set for o(1)
      return "Already exists";
    }
  }

  return (
    <Autocomplete
      options={options}
      value={value}
      name={name}
      id={name}
      freeSolo
      onChange={(_, value) => handleOnChange(value)}
      onBlur={(e) => handleOnChange(e.target.value)}
      renderInput={params => {
        return (
          <Field
            className={classes.customInput} // PLEASE DONT CHANGE ANYTHING HERE
            label={label}
            name={name + "2"}  // 2 is hacky way to make autocomplete to work properly
            component={TextField}
            {...params}
            validate={validateAlreadyExists}
          />
        );
      }}
    />
  );
}
