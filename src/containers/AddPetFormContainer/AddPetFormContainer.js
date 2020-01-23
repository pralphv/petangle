import React from "react";
import { useFirebase } from "react-redux-firebase";

import { AddPetForm } from "../../components";
import { useUserId } from "../../utils/customHooks";

function AddPetFormContainer() {
  const userId = useUserId();
  const firebase = useFirebase();

  return <AddPetForm firebase={firebase} userId={userId} />;
}

export default AddPetFormContainer;
