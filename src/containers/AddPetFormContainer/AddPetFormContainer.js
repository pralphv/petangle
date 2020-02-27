import React from "react";
import { useFirebase } from "react-redux-firebase";

import { AddPetForm } from "../../components";
import { useUserId, useLanguage } from "../../utils/customHooks";

function AddPetFormContainer() {
  const userId = useUserId();
  const firebase = useFirebase();
  const locale = useLanguage();

  return <AddPetForm firebase={firebase} userId={userId} locale={locale} />;
}

export default AddPetFormContainer;
