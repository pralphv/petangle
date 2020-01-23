import React from "react";
import { AddPetFormContainer } from "../../containers";
import { HelmetWrapper, FormContainer } from "../../components";

function AddPetPage() {
  return (
    <FormContainer>
      <HelmetWrapper title="Add Pet" content="Add Pets" />
      <AddPetFormContainer />
    </FormContainer>
  );
}

export default AddPetPage;
