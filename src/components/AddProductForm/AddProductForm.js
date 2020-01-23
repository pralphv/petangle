import React, { useState, useEffect } from "react";
import { Formik } from "formik";

import { INITIAL_STATE, FORM_FIELD_ORDER } from "./constants";
import { ADDED_PRODUCT_POINT } from "../../utils/constants";
import { nutrientsValidationSchema } from "./yupValidation";
import { CustomAutoSuggestField } from "./CustomAutoSuggestField";
import { CustomField } from "./CustomField";
import {
  LoadingSpinner,
  NotificationPopUp,
  FormikCustomSelect,
  CustomButton,
  BoldTitle,
  ErrorText
} from "../../components";
import { standardizeFormData } from "./formSubmit";
import {
  updateDbUpdateTime,
  addContributionPoint,
  pushProductObject,
  pushUserSubmittedProduct
} from "../../firebase/crud";
import { sendSlackMsg } from "../../utils/helper";

export default function AddProductForm({
  alreadyExistsBrands,
  brandToProductsMap,
  addProductToRedux,
  firebase,
  userId
}) {
  const [brand, setBrand] = useState("");
  const [productsSuggestions, setProductsSuggestions] = useState([]);
  const [registerError, setRegisterError] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    // find product suggestions from brand
    if (brand) {
      const productsList = brandToProductsMap[brand];
      setProductsSuggestions(productsList);
    }
  }, [brand]);

  async function handleOnSubmit(form, action) {
    setRegisterError("");
    const standardizedForm = standardizeFormData(form);
    try {
      const { isSuccessful, snapshot } = await pushProductObject(
        firebase,
        standardizedForm
      );

      if (isSuccessful) {
        const newObjId = snapshot.key;
        const newReduxObj = { [newObjId]: standardizedForm };
        const msg = `
          pro Added:
          Id: ${newObjId}
          Brand: ${form.b}
          Product: ${form.pr}
        `;
        addContributionPoint(firebase, ADDED_PRODUCT_POINT, userId);
        pushUserSubmittedProduct(firebase, { pi: newObjId }, userId);
        addProductToRedux(newReduxObj);
        updateDbUpdateTime(firebase, Date.now());
        sendSlackMsg(msg);
      }
    } catch (error) {
      console.log(error);
      setRegisterError(
        "There seems to be a server error. Please try again later."
      );
    } finally {
      setNotificationOpen(true);
      action.resetForm();
      setBrand("");
      window.scrollTo(0, 0);
    }
  }

  return (
    <div>
      <BoldTitle text="Add a Product" />
      <Formik
        initialValues={INITIAL_STATE}
        onSubmit={(form, action) => handleOnSubmit(form, action)}
        validationSchema={nutrientsValidationSchema}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
          } = props;
          return (
            <div>
              {isSubmitting && <LoadingSpinner />}
              <form onSubmit={handleSubmit}>
                <FormikCustomSelect
                  name="a"
                  value={values.a || ""}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  options={["Cat", "Dog"]}
                  label="Select animal *"
                />
                <br />
                <FormikCustomSelect
                  name="fc"
                  value={values.fc || ""}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  options={["Dry Food", "Wet Food", "Snack"]}
                  label="Select category *"
                />
                <br />
                <CustomAutoSuggestField
                  brand_or_product="b"
                  name={"b"}
                  value={values.b || ""}
                  label="Brand *"
                  setFieldValue={setFieldValue}
                  options={[...alreadyExistsBrands]}
                  setState={setBrand}
                />
                <CustomAutoSuggestField
                  brand_or_product="pr"
                  name={"pr"}
                  value={values.pr || ""}
                  label="Product *"
                  setFieldValue={setFieldValue}
                  options={productsSuggestions}
                />
                {Object.keys(FORM_FIELD_ORDER).map(name => (
                  <CustomField name={name} key={name} />
                ))}
                <br />
                <CustomButton text="Submit" />
                <br />
                {registerError && <ErrorText text={registerError} />}
              </form>
            </div>
          );
        }}
      </Formik>
      <NotificationPopUp
        active={notificationOpen}
        setState={setNotificationOpen}
        text="Successfully submitted"
      />
    </div>
  );
}
