import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

import { CustomSelect } from "../../components";
import { productFilterActions } from "../../state/productFilter";
import { MISC_LANG } from "../../utils/constants";
import { useLanguage } from "../../utils/customHooks";

export const AnimalSelectContainer = ({ filterAnimal }) => {
  const animal = useSelector(state => state.productFilter.animal);
  const locale = useLanguage();

  return (
    <CustomSelect
      label={MISC_LANG.a[locale]}
      id={MISC_LANG.a.en}
      value={animal}
      listOfOptions={["Cat", "Dog"]}
      handleChangeRedux={filterAnimal}
    />
  );
};

AnimalSelectContainer.propTypes = {
  filterAnimal: PropTypes.func.isRequired
};

export default connect(null, {
  filterAnimal: productFilterActions.filterAnimal
})(AnimalSelectContainer);
