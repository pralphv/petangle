import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";

import { Field } from "formik";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles(theme => ({
  customSelect: {
    marginRight: theme.spacing(2),
    minWidth: 140
  }
}));

export default function FormikCustomSelect({
  name,
  value,
  handleChange,
  handleBlur,
  options,
  label
}) {
  const classes = useStyles();

  return (
    <Field
      className={classes.customSelect}
      type="text"
      name={name}
      value={value}
      label={label}
      onChange={handleChange}
      onBlur={handleBlur}
      select
      variant="standard"
      margin="normal"
      component={TextField}
      InputLabelProps={{
        shrink: true
      }}
    >
      {options.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Field>
  );
}

FormikCustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired
};
