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
  you: { label: { en: "POINTS", zh: "分數", jp: "ポイント" }, color: 1 },
  users: { label: { en: "USERS", zh: "用戶量", jp: "ユーザー"}, color: 2 },
  pets: { label: { en: "PETS", zh: "寵物量", jp: "ペット"}, color: 3 }
};

function PointBoxContainer({ name, locale }) {
  if (!locale) {
    locale = 'eng'
  }
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
      caption={propsMap[name].label[locale]}
      color={propsMap[name].color}
    />
  );
}

PointBoxContainer.propTypes = {
  name: PropTypes.string.isRequired,
  locale: PropTypes.string,
};

export default PointBoxContainer;
