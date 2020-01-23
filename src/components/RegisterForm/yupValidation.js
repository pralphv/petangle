import * as Yup from "yup";

let yupString = Yup.string().required("Required");

export const registerValidationSchema = Yup.object().shape({
  username: yupString.max(15, "Too long!"),
  email: yupString,
  passwordOne: yupString,
  passwordTwo: yupString.oneOf(
    [Yup.ref("passwordOne"), null],
    "Passwords must match"
  )
});

