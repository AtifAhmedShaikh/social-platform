import Joi from "joi";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const usernamePattern = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,30}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Define configurations of validation schema using Joi
const userRegistrationSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(30)
    .messages({
      "string.min": "name must have at least 5 characters",
      "string.max": "name must less then 30 characters",
    })
    .required(),
  username: Joi.string()
    .min(10)
    .max(30)
    .regex(usernamePattern)
    .messages({
      "string.min": "username must have at least 10 characters",
      "string.max": "username must less then 30 characters",
      "string.pattern.base": "username must be lowercase, avoid spaces or dots",
    })
    .required(),
  email: Joi.string()
    .email()
    .regex(emailPattern)
    .messages({
      "string.email": "Invalid email address",
      "string.pattern.base": "Invalid email address",
    })
    .required(),
  password: Joi.string()
    .min(10)
    .max(30)
    .regex(passwordPattern)
    .messages({
      "string.min": "password must have at least 10 characters",
      "string.max": "password must less then 30 characters",
      "string.pattern.base": "password must have one lowercase, uppercase and digit ",
    })
    .required(),
  bio: Joi.string()
    .min(30)
    .max(300)
    .messages({
      "string.min": "bio must have at least 30 characters",
      "string.max": "bio must less then 300 characters",
    })
    .required(),
});

const userLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().regex(passwordPattern).required(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .min(10)
    .max(30)
    .regex(passwordPattern)
    .messages({
      "string.min": "password must have at least 10 characters",
      "string.max": "password must less then 25 characters",
      "string.pattern.base": "password must have one lowercase, uppercase and digits",
      "string.empty": "current password cannot be an empty field ",
      "any.required": "current password is a required field",
    })
    .required(),
  newPassword: Joi.string()
    .min(10)
    .max(30)
    .regex(passwordPattern)
    .messages({
      "string.min": "password must have at least 10 characters",
      "string.max": "password must less then 25 characters",
      "string.pattern.base": "password must have one lowercase, uppercase and digits",
      "string.empty": "new password cannot be an empty field ",
      "any.required": "new password is a required field",
    })
    .required(),
});

const userUpdateAccountDetailsSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(30)
    .messages({
      "string.min": "name must have at least 5 characters",
      "string.max": "name must less then 30 characters",
      "string.empty": "name cannot be an empty field ",
      "any.required": "name is a required field",
    })
    .required(),
  username: Joi.string()
    .min(10)
    .max(30)
    .regex(usernamePattern)
    .messages({
      "string.min": "username must have at least 10 characters",
      "string.max": "username must less then 30 characters",
      "string.pattern.base": "username must be lowercase, avoid spaces or dots",
      "string.empty": "username cannot be an empty field ",
      "any.required": "username is a required field",
    })
    .required(),
  bio: Joi.string()
    .min(30)
    .max(300)
    .messages({
      "string.min": "bio must have at least 30 characters",
      "string.max": "bio must less then 300 characters",
      "string.empty": "bio cannot be an empty field ",
      "any.required": "bio is a required field",
    })
    .required(),
});

export {
  userRegistrationSchema,
  userLoginSchema,
  userUpdateAccountDetailsSchema,
  changePasswordSchema,
};
