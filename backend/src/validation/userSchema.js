import Joi from "joi";

// Define configurations of validation schema using Joi
const userRegistrationSchema = Joi.object({
  name: Joi.string()
    .min(10)
    .max(25)
    .messages({
      "string.min": "name must have at least 10 characters",
      "string.max": "name must less then 25 characters",
    })
    .required(),
  username: Joi.string()
    .min(10)
    .max(30)
    .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,30}$/)
    .messages({
      "string.min": "username must have at least 10 characters",
      "string.max": "username must less then 30 characters",
      "string.pattern.base": "username only be without spaces",
    })
    .required(),
  email: Joi.string()
    .email()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      "string.email": "Invalid email address",
      "string.pattern.base": "Invalid email address",
    })
    .required(),
  password: Joi.string()
    .min(10)
    .max(25)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .messages({
      "string.min": "password must have at least 10 characters",
      "string.max": "password must less then 25 characters",
      "string.pattern.base": "password must have one lowercase, uppercase and digits",
    })
    .required(),
  bio: Joi.string()
    .min(30)
    .max(120)
    .messages({
      "string.min": "bio must have at least 10 characters",
      "string.max": "bio must less then 25 characters",
    })
    .required(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .min(10)
    .max(25)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .messages({
      "string.min": "password must have at least 10 characters",
      "string.max": "password must less then 25 characters",
      "string.pattern.base": "password must have one lowercase, uppercase and digits",
    })
    .required(),
  newPassword: Joi.string()
    .min(10)
    .max(25)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .messages({
      "string.min": "password must have at least 10 characters",
      "string.max": "password must less then 25 characters",
      "string.pattern.base": "password must have one lowercase, uppercase and digits",
    })
    .required(),
});

export { userRegistrationSchema, changePasswordSchema };
