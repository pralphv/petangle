import * as constants from "./constants";
import { SHORT_FORM_MAP } from "../utils/constants";
import { config } from "./firebase";

// probably needs reconciling

async function doTransaction(firebase, path, value) {
  const ref = firebase.ref(path);
  ref.transaction(curreuntCount => {
    return (curreuntCount || 0) + value;
  });
}

async function fetchFirebase(firebase, endPoint) {
  const ref = firebase.ref(endPoint);
  let result;
  await ref.once("value", snapshot => {
    result = snapshot.val();
  });
  return result;
}

async function pushNewEntry(firebase, path, obj) {
  const ref = firebase.ref(path);
  let isSuccessful = true;
  const snapshot = await ref.push(obj, error => {
    if (error) {
      alert(error);
      isSuccessful = false;
    }
  });
  return { isSuccessful, snapshot };
}

async function setObject(firebase, path, obj) {
  const ref = firebase.ref(path);
  try {
    await ref.set(obj);
    return true;
  } catch (error) {
    console.log(erorr);
    return false;
  }
}

async function updateObject(firebase, path, obj) {
  const ref = firebase.ref(path);
  try {
    await ref.update(obj);
    return true;
  } catch (error) {
    console.log(erorr);
    return false;
  }
}

async function deleteObject(firebase, path) {
  const ref = firebase.ref(path);
  try {
    await ref.remove();
    return true;
  } catch (error) {
    console.log(erorr);
    return false;
  }
}

async function deleteObjectBasedOnValue(firebase, path, key, value) {
  const ref = firebase.ref(path);
  let deleted = false;
  try {
    const snapshot = await ref
      .orderByChild(key)
      .equalTo(value)
      .once("value");
    snapshot.forEach(childSnapshot => {
      ref.child(childSnapshot.key).remove();
      deleted = true;
    });
    return { status: "success", deleted };
  } catch (error) {
    console.log(erorr);
    return { status: "fail", deleted };
  }
}

//////////////////////////////////////
export async function fetchLastUpdateTime(firebase) {
  const dbLastUpdateTime = await fetchFirebase(
    firebase,
    constants.END_POINT_LAST_UPDATE_TIME
  );
  return dbLastUpdateTime;
}

export async function fetchProductsObject(firebase) {
  const productsObj = await fetchFirebase(
    firebase,
    constants.END_POINT_PRODUCTS
  );
  return productsObj;
}

export async function pushProductObject(firebase, objToSave) {
  const path = constants.END_POINT_PRODUCTS;
  const { isSuccessful, snapshot } = await pushNewEntry(
    firebase,
    path,
    objToSave
  );
  return { isSuccessful, snapshot };
}

export async function fetchProductDetails(firebase, productId) {
  const obj = await fetchFirebase(
    firebase,
    `${constants.END_POINT_PRODUCTS}/${productId}`
  );
  return obj;
}

export async function fetchUserPets(firebase, userId) {
  const obj = await fetchFirebase(
    firebase,
    `${constants.END_POINT_USERS}/${userId}/pets`
  );
  return obj;
}

export async function fetchUserSavedProducts(firebase, userId) {
  const obj = await fetchFirebase(
    firebase,
    `${constants.END_POINT_USERS}/${userId}/saved`
  );
  return obj;
}

export async function fetchUserSubmittedProducts(firebase, userId) {
  const obj = await fetchFirebase(
    firebase,
    `${constants.END_POINT_USERS}/${userId}/submittedProduct`
  );
  return obj;
}

export async function fetchProductPreference(
  firebase,
  productId,
  likeOrDislike
) {
  const shortForm = SHORT_FORM_MAP[likeOrDislike];
  const obj = await fetchFirebase(
    firebase,
    `${constants.END_POINT_PREFERENCE}/${productId}/${shortForm}`
  );
  return obj;
}

export async function saveProduct(firebase, objToSave, userId) {
  const path = `${constants.END_POINT_USERS}/${userId}/saved/`;
  const { isSuccessful, snapshot } = await pushNewEntry(
    firebase,
    path,
    objToSave
  );
  return isSuccessful;
}

export async function removeSavedProduct(firebase, productId, userId) {
  // 1. find id of liked product
  // 2. use this id to remove from path

  let path = `${constants.END_POINT_USERS}/${userId}/saved/`;
  const db = firebase.ref(path);
  db.orderByChild("pi")
    .equalTo(productId)
    .once("value", snapshot => {
      const prefKey = Object.keys(snapshot.val())[0]; // should be only 1 returned
      path = path + prefKey;
      firebase.ref(path).remove();
    });
}

export async function pushUserSubmittedProduct(firebase, objToSave, userId) {
  const path = `${constants.END_POINT_USERS}/${userId}/submittedProduct/`;
  const { isSuccessful, snapshot } = await pushNewEntry(
    firebase,
    path,
    objToSave
  );
  return isSuccessful;
}

export async function addContributionPoint(firebase, points, userId) {
  const path = `${constants.END_POINT_CONTRIBUTION_POINTS}/${userId}/p/`;
  doTransaction(firebase, path, points);
}

export async function addUserToContributionEndPoint(
  firebase,
  userId,
  username
) {
  const path = `${constants.END_POINT_CONTRIBUTION_POINTS}/${userId}/`;
  const objToSave = { u: username, p: 0 };
  const isSuccessful = setObject(firebase, path, objToSave);
  return isSuccessful;
}

export async function updateDbUpdateTime(firebase, time) {
  const obj = {
    lastUpdateTime: time
  };
  const path = "/";
  const isSuccessful = await updateObject(firebase, path, obj);
  return isSuccessful;
}

export async function updatePetName(firebase, userId, petId, newName) {
  const path = `${constants.END_POINT_USERS}/${userId}/pets/${petId}/`;
  const obj = { n: newName };
  const isSuccessful = await updateObject(firebase, path, obj);
  return isSuccessful;
}

export async function deletePet(firebase, userId, petId) {
  const path = `${constants.END_POINT_USERS}/${userId}/pets/${petId}/`;
  const isSuccessful = await deleteObject(firebase, path);
  return isSuccessful;
}

export async function addPet(firebase, userId, petForm) {
  // petForm =  {'a': 'cat', 'n': 'cat_1'}
  const path = `${constants.END_POINT_USERS}/${userId}/pets`;
  const { isSuccessful, snapshot } = await pushNewEntry(
    firebase,
    path,
    petForm
  );
  return isSuccessful;
}

export async function likeOrDislikeProduct(
  firebase,
  userId,
  petId,
  productId,
  lOrDl
) {
  const path = `${constants.END_POINT_USERS}/${userId}/pets/${petId}/${lOrDl}`;
  const obj = { pi: productId };
  const { isSuccessful, snapshot } = await pushNewEntry(firebase, path, obj);
  return isSuccessful;
}

export async function unlikeProduct(firebase, userId, petId, productId, lOrDl) {
  const path = `${constants.END_POINT_USERS}/${userId}/pets/${petId}/${lOrDl}`;
  const { status, deleted } = await deleteObjectBasedOnValue(
    firebase,
    path,
    "pi",
    productId
  );
  return { status, deleted };
}

export async function addLikeCount(firebase, productId, lOrDl, point) {
  const path = `${constants.END_POINT_PRODUCTS}/${productId}/${lOrDl}/`;
  doTransaction(firebase, path, point);
}

export async function addPreferenceCount(
  firebase,
  productId1,
  productId12,
  lOrDl,
  point
) {
  const path = `${constants.END_POINT_PREFERENCE}/${productId1}/${lOrDl}/${productId12}/`;
  doTransaction(firebase, path, point);
}

export async function fetchContributionTop10(firebase) {
  let orderedArray = [];

  const ref = firebase
    .ref(constants.END_POINT_CONTRIBUTION_POINTS)
    .orderByChild("p")
    .limitToLast(10);

  await ref.once("value", snapshot => {
    let rank = snapshot.numChildren();
    snapshot.forEach(child => {
      let obj = child.val();
      obj["rank"] = rank;
      rank -= 1;
      orderedArray.push(obj);
    });
    orderedArray.reverse();
  });
  return orderedArray;
}

export async function fetchNumberOfUsers(firebase) {
  const number = await fetchFirebase(
    firebase,
    `${constants.END_POINT_NUMBER_OF_USERS}`
  );
  return number;
}
export async function fetchNumberOfPets(firebase) {
  const number = await fetchFirebase(
    firebase,
    `${constants.END_POINT_NUMBER_OF_PETS}`
  );
  return number;
}

export async function fetchUserContributionPoint(firebase, userId) {
  const path = `${constants.END_POINT_CONTRIBUTION_POINTS}/${userId}/p`;
  const number = await fetchFirebase(firebase, path);
  return number;
}

export async function addUserCount(firebase) {
  const path = `${constants.END_POINT_NUMBER_OF_USERS}`;
  doTransaction(firebase, path, 1);
}

export async function addPetsCount(firebase) {
  const path = `${constants.END_POINT_NUMBER_OF_PETS}`;
  doTransaction(firebase, path, 1);
}

export async function decreasePetsCount(firebase) {
  const path = `${constants.END_POINT_NUMBER_OF_PETS}`;
  doTransaction(firebase, path, -1);
}

export async function registerUser(firebase, email, password) {
  const authUser = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  return authUser;
}

export async function sendPasswordResetEmail(firebase, email) {
  await firebase.auth().sendPasswordResetEmail(email);
}

export async function sendVerification(firebase) {
  await firebase.auth().currentUser.sendEmailVerification({
    url: config.domain
  });
}

export async function logout(firebase) {
  await firebase.auth().signOut();
}
