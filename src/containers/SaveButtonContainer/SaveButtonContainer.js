import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFirebase } from "react-redux-firebase";

import { SaveButton } from "../../components";
import { useLoggedIn, useUserId } from "../../utils/customHooks";
import { saveProduct, removeSavedProduct } from "../../firebase/crud";
import { fetchUserSavedProducts } from "../../firebase/crud";

// this container is not connected to redux
// each time the product page is loaded, data is reloaded
// to get the latest state of saved products
function SaveButtonContainer({ productId }) {
  const isLoggedIn = useLoggedIn();
  const firebase = useFirebase();
  const userId = useUserId();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const savedProducts = await fetchUserSavedProducts(firebase, userId);
      if (savedProducts) {
        Object.values(savedProducts).forEach(obj => {
          if (obj.pi === productId) {
            setIsSaved(true);
          }
        });
      }
    }
    setIsSaved(false);
    fetchData();
  }, [isLoggedIn, productId]);
  async function handleOnClick() {
    if (isSaved) {
      removeSavedProduct(firebase, productId, userId);
      setIsSaved(false);
    } else {
      const objToSave = {
        pi: productId
      }
      const isSuccessful = await saveProduct(firebase, objToSave, userId);
      if (isSuccessful) {
        setIsSaved(true);
      }
    }
  }
  return <SaveButton isSaved={isSaved} handleOnClick={handleOnClick} />;
}

SaveButtonContainer.propTypes = {
  productId: PropTypes.string.isRequired
};

export default SaveButtonContainer;
