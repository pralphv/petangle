import * as Yup from "yup";

let yupString = Yup.string().required("Required");

export const petValidationSchema = Yup.object().shape({
  n: yupString,
  a: yupString
});
