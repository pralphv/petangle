import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFirebase } from "react-redux-firebase";

import { PointBox } from "../../components";

import { useLoggedIn, useUserId } from "../../utils/customHooks";
import {
  fetchNumberOfUsers,
  fetchNumberOfPets,
  fetchUserContributionPoint
} from "../../firebase/crud";

const propsMap = {
  you: { label: "YOUR POINTS", color: 1 },
  users: { label: "USER COUNT", color: 2 },
  pets: { label: "PET COUNT", color: 3 }
};

function PointBoxContainer({ name }) {
  const userId = useUserId();
  const isLoggedIn = useLoggedIn();
  const firebase = useFirebase();
  const functionMap = {
    you: fb => fetchUserContributionPoint(fb, userId),
    users: fetchNumberOfUsers,
    pets: fetchNumberOfPets
  };

  const [value, setValue] = useState(0);

  const functionToUse = functionMap[name];

  useEffect(() => {
    async function fetchData() {
      const number = await functionToUse(firebase);
      setValue(number);
    }
    fetchData();
  }, [isLoggedIn]);
  return (
    <PointBox
      points={value}
      caption={propsMap[name].label}
      color={propsMap[name].color}
    />
  );
}

PointBoxContainer.propTypes = {
  name: PropTypes.string.isRequired
};

export default PointBoxContainer;
