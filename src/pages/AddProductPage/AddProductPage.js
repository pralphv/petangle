import React from "react";
import { AddProductFormContainer } from "../../containers";
import { HelmetWrapper, FormContainer } from "../../components";

function AddProductPage() {
  return (
    <FormContainer>
      <HelmetWrapper title="Add Product" content="Add products" />
      <AddProductFormContainer />
    </FormContainer>
  );
}

export default AddProductPage;
