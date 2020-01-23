import React from "react";
import { RegisterFormContainer } from "../../containers";
import { HelmetWrapper, FormContainer } from "../../components";

function RegisterPage() {
  return (
    <FormContainer>
      <HelmetWrapper title="Register" content="Register" />
      <RegisterFormContainer />
    </FormContainer>
  );
}

export default RegisterPage;
