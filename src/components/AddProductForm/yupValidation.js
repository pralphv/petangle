import * as Yup from "yup";

let yupNumber = Yup.number()
  .typeError("Must be a number")
  .min(0, "Must be greater than 0")
  .max(100, "Must be less than 100");
let yupNumberRequired = yupNumber.required("Required");
let yupString = Yup.string().required("Required");

export const nutrientsValidationSchema = Yup.object().shape({
  a: yupString,
  fc: yupString,
  b: yupString, 
  pr: yupString,
  cb: yupNumber,
  f: yupNumberRequired,
  pro: yupNumberRequired,
  li: yupString,
  wm: yupNumberRequired,
  cra: yupNumberRequired,
  Ca: yupNumber,
  cl: Yup.number()
    .typeError("Must be a number")
    .min(0, "Must be greater than 0"),
  fi: yupNumberRequired,
  Mg: yupNumber,
  P: yupNumber,
  t: yupNumber
});

export function validateLink(value) {
  let error;
  if (!value.includes("http")) {
    error = "Invalid link";
  }
  return error;
}
