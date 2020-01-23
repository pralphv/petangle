import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import {
  PetNameInput,
  Cards,
  CustomDialog,
  NotificationPopUp,
  EmptyPage
} from "../../components";
import { useUserId } from "../../utils/customHooks";
import { productsActions } from "../../state/product";
import {
  updatePetName,
  deletePet,
  decreasePetsCount
} from "../../firebase/crud";
import { useSelectedProducts } from "../../utils/customHooks";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 280
  },

}));


export const MyPetsContainer = ({ fetchProduct }) => {
  const history = useHistory();
  const firebase = useFirebase();
  const pets = useSelector(state => state.firebase.profile.pets);
  const userId = useUserId();
  const [open, setOpen] = React.useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [notificationActive, setNotificationActive] = useState(false);

  const classes = useStyles();


  function handleClose() {
    setOpen(false);
  }

  function handleDeleteOnClick(petId) {
    setDeletingId(petId);
    setOpen(true);
  }

  async function handleConfirmDelete() {
    const isSuccessful = await deletePet(firebase, userId, deletingId);
    await decreasePetsCount(firebase);
    if (isSuccessful) {
      setNotificationActive(true);
      setOpen(false);
    }
  }

  function handleNameOnBlur(e) {
    updatePetName(firebase, userId, e.target.id, e.target.value);
  }

  let productsThatNeedsToBeLoaded = [];
  pets &&
    Object.values(pets).forEach(obj => {
      const likesList = (obj.l && extractProductIds(obj.l)) || [];
      const dislikesList = (obj.dl && extractProductIds(obj.dl)) || [];
      likesList.forEach(productId =>
        productsThatNeedsToBeLoaded.push(productId)
      );
      dislikesList.forEach(productId =>
        productsThatNeedsToBeLoaded.push(productId)
      );
    });

  const productsObj = useSelectedProducts(
    productsThatNeedsToBeLoaded,
    fetchProduct
  );

  return (
    <div className={classes.root}>
      {pets ? (
        Object.entries(pets).map(([key, values]) => (
          <div key={key}>
            <PetNameInput
              animal={values.a}
              value={values.n}
              handleNameOnBlur={handleNameOnBlur}
              handleDeleteOnClick={() => {
                handleDeleteOnClick(key);
              }}
              id={key}
            />
            <Cards
              productsObj={
                (values.l &&
                  getMultipleKeysFromObj(
                    productsObj,
                    extractProductIds(values.l)
                  )) ||
                {}
              }
              history={history}
              icon="like"
            />
            <Cards
              productsObj={
                (values.dl &&
                  getMultipleKeysFromObj(
                    productsObj,
                    extractProductIds(values.dl)
                  )) ||
                {}
              }
              history={history}
              icon="dislike"
            />
          </div>
        ))
      ) : (
        <EmptyPage text="You have not added any pets" />
      )}
      <CustomDialog
        title="Delete Pet?"
        body="You will not be able to recover the deleted pet"
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirmDelete}
      />
      <NotificationPopUp
        active={notificationActive}
        setState={setNotificationActive}
        text="Pet Deleted"
      />
    </div>
  );
};

function getMultipleKeysFromObj(obj, keys) {
  const newObj = {};
  keys.forEach(key => {
    newObj[key] = obj[key];
  });
  return newObj;
}

function extractProductIds(obj) {
  return Object.values(obj).map(obj => obj.pi);
}

MyPetsContainer.propTypes = {
  fetchProduct: PropTypes.func.isRequired
};

getMultipleKeysFromObj.propTypes = {
  obj: PropTypes.object.isRequired,
  keys: PropTypes.string.isRequired
};

extractProductIds.propTypes = {
  obj: PropTypes.object.isRequired
};

export default connect(null, {
  fetchProduct: productsActions.fetchProduct
})(MyPetsContainer);
