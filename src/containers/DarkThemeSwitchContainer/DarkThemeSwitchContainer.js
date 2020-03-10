import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { useSelector } from "react-redux";

import { changeThemeActions } from "../../state/darkTheme";
import { DarkThemeSwitch, DarkThemeSwitchNavBar } from "../../components";

export const DarkThemeSwitchContainer = ({ isNavBar = false, changeTheme }) => {
  const theme = useSelector(state => state.theme.theme);
  return (
    <span>
      {isNavBar ? (
        <DarkThemeSwitchNavBar theme={theme} changeTheme={changeTheme}/>
      ) : (
        <DarkThemeSwitch theme={theme} changeTheme={changeTheme} />
      )}
    </span>
  );
};

DarkThemeSwitchContainer.propTypes = {
  changeTheme: PropTypes.func.isRequired
};

export default connect(null, {
  changeTheme: changeThemeActions.changeTheme
})(DarkThemeSwitchContainer);
