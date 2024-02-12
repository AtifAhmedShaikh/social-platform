import * as yup from "yup";

// Define user registration schema for validation
const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(10, "name must have at least 10 characters")
    .max(25, "name must less then 25 characters")
    .required("Name is required !"),
  username: yup
    .string()
    .min(10, "username must have at least 10 characters")
    .max(30, "username must less then 25 characters")
    .required("Username is required !")
    .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,30}$/, {
      message: "use only lowercase, avoid spaces or dots",
    })
    .lowercase("username must have in lowercase ")
    .trim(),
  email: yup
    .string()
    .email("Please Enter valid Email ")
    .required("Email is required !"),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        "password have at least one lowercase, uppercase letter and one digit ",
    })
    .min(10, "password must have at least 10 characters")
    .max(25, "password must less then 25 characters")
    .required("password is required ! "),
  confirmPassword: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        "confirm have at least one lowercase letter, one uppercase letter, and one digit ",
    })
    .oneOf([yup.ref("password")], "confirm password and password must be same ")
    .required("confirm password is required "),
});

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(10, "username must have at least 10 characters")
    .max(25, "password must less then 25 characters")
    .required("username or email required !"),
  password: yup
    .string()
    .min(10, "username must have at least 10 characters")
    .max(25, "password must less then 25 characters")
    .required("password is required "),
});

export { registerSchema, loginSchema };
