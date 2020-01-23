import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

import { CustomSelect } from "../../components";
import { productFilterActions } from "../../state/productFilter";

export const AnimalSelectContainer = ({ filterAnimal }) => {
  const animal = useSelector(state => state.productFilter.animal);

  return (
    <CustomSelect
      label="Animal" // this needs to be from selector
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
