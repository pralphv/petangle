import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

import { MISC_LANG } from "../../utils/constants";
import { useLanguage } from "../../utils/customHooks";

const SPACING = 1.5;
const BORDER_RADIUS = 8;
const FONT_WEIGHT = 600;

const useStyles = makeStyles(theme => ({
  formControl: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: 150
  },
  select1: {
    borderColor: theme.palette.type === "dark"? theme.palette.secondary.main: theme.palette.primary.main,
    padding: theme.spacing(SPACING),
    borderRadius: BORDER_RADIUS,
    color: theme.palette.type === "dark"? theme.palette.secondary.main: theme.palette.primary.main,
    background: theme.palette.background.default ,
    fontWeight: FONT_WEIGHT,
    cursor: "pointer"
  },
  select2: {
    border: "0px",
    padding: theme.spacing(SPACING),
    borderRadius: BORDER_RADIUS,
    color: "#fff",
    background: "linear-gradient(to right, #2D75D9, #6BA1FF)",
    fontWeight: FONT_WEIGHT,
    cursor: "pointer"
  },
  select3: {
    border: "0px",
    padding: theme.spacing(SPACING),
    borderRadius: BORDER_RADIUS,
    color: "#fff",
    background: "linear-gradient(to right, #007EA4, #2BAAD2)",
    fontWeight: FONT_WEIGHT,
    cursor: "pointer"
  }
}));

export default function CustomSelect({
  label,
  id,
  value,
  listOfOptions,
  handleChangeRedux
}) {
  const classes = useStyles();
  const locale = useLanguage();

  const classMap = {
    Animal: classes.select2,
    Brand: classes.select1,
    "Food Category": classes.select3
  };

  const selectClass = classMap[id];

  function handleChange(e) {
    const value = e.target.value;
    handleChangeRedux(value);
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <select className={selectClass} value={value} onChange={handleChange} >
          <option value="" label={label} style={{ color: "#0f0f0f"}}>
            {label}
          </option>
          {listOfOptions.map(elem => (
            <option
              key={elem}
              value={elem}
              style={{ color: "#0f0f0f" }}
            >
              {id === "Brand"? elem: MISC_LANG[elem][locale]}
            </option>
          ))}
        </select>
      </FormControl>
    </div>
  );
}

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  listOfOptions: PropTypes.array,
  handleChangeRedux: PropTypes.func
};
