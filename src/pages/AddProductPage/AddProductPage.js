import React from "react";

import { AddProductFormContainer } from "../../containers";
import { HelmetWrapper, FormContainer } from "../../components";
import { useLanguage } from "../../utils/customHooks";

function AddProductPage() {
  const locale = useLanguage() || "en";

  return (
    <FormContainer>
      <HelmetWrapper title="Add Product" content="Add products" />
      <AddProductFormContainer locale={locale} />
    </FormContainer>
  );
}

export default AddProductPage;
