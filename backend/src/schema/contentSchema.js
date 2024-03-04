import Joi from "joi";

const postSchema = Joi.object({
  caption: Joi.string()
    .min(10)
    .max(1000)
    .messages({
      "string.min": "post caption must have at least 10 characters",
      "string.max": "post caption must less then 1000 characters",
      "string.empty": "post caption cannot be an empty field ",
      "any.required": "post caption is a required field",
    })
    .required(),
  isPublic: Joi.boolean()
    .messages({
      "any.required": "isPublic field is required ",
    })
    .required(),
  allowSaving: Joi.boolean()
    .messages({
      "any.required": "allowSaving field is required ",
    })
    .required(),
  allowComments: Joi.boolean()
    .messages({
      "any.required": "allowComments field is required ",
    })
    .required(),
});
const reelSchema = Joi.object({
  caption: Joi.string()
    .min(10)
    .max(1000)
    .messages({
      "string.min": "reel caption must have at least 10 characters",
      "string.max": "reel caption must less then 1000 characters",
      "string.empty": "reel caption cannot be an empty field ",
      "any.required": "reel caption is a required field",
    })
    .required(),
  isPublic: Joi.boolean()
    .messages({
      "any.required": "isPublic field is required ",
    })
    .required(),
  allowSaving: Joi.boolean()
    .messages({
      "any.required": "allowSaving field is required ",
    })
    .required(),
  allowComments: Joi.boolean()
    .messages({
      "any.required": "allowComments field is required ",
    })
    .required(),
});

const tweetSchema = Joi.object({
  content: Joi.string()
    .min(10)
    .max(1000)
    .messages({
      "string.min": "tweet content must have at least 10 characters",
      "string.max": "tweet content must less then 1000 characters",
    })
    .required(),
  isPublic: Joi.boolean()
    .messages({
      "any.required": "isPublic field is required ",
    })
    .required(),
  allowSaving: Joi.boolean()
    .messages({
      "any.required": "allowSaving field is required ",
    })
    .required(),
  allowComments: Joi.boolean()
    .messages({
      "any.required": "allowComments field is required ",
    })
    .required(),
});

const commentSchema = Joi.object({
  content: Joi.string()
    .min(10)
    .max(1000)
    .messages({
      "string.min": "comment content must have at least 10 characters",
      "string.max": "comment content must less then 1000 characters",
      "string.empty": "comment cannot be an empty field ",
      "any.required": "comment is a required field",
    })
    .required(),
});

export { commentSchema, postSchema, reelSchema, tweetSchema };
