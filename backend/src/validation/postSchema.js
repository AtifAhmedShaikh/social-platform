import Joi from "joi";

const createPostSchema = Joi.object({
  caption: Joi.string()
    .min(10)
    .max(200)
    .messages({
      "string.min": "caption must have at least 10 characters",
      "string.max": "caption must less then 200 characters",
    })
    .required(),
  isPublic: Joi.boolean().required(),
  allowComments: Joi.boolean().required(),
  allowSharing: Joi.boolean().required(),
  allowSaving: Joi.boolean().required(),
  displayLikeCount: Joi.boolean().required(),
});

const createTweetSchema = Joi.object({
  content: Joi.string()
    .min(10)
    .max(1000)
    .messages({
      "string.min": "content must have at least 10 characters",
      "string.max": "caption must less then 1000 characters",
    })
    .required(),
  isPublic: Joi.boolean().required(),
  allowComments: Joi.boolean().required(),
  allowSharing: Joi.boolean().required(),
  allowSaving: Joi.boolean().required(),
  displayLikeCount: Joi.boolean().required(),
});

const createReelSchema = Joi.object({
  caption: Joi.string()
    .min(10)
    .max(200)
    .messages({
      "string.min": "caption must have at least 10 characters",
      "string.max": "caption must less then 200 characters",
    })
    .required(),
  isPublic: Joi.boolean().required(),
  allowComments: Joi.boolean().required(),
  allowSharing: Joi.boolean().required(),
  allowSaving: Joi.boolean().required(),
  displayLikeCount: Joi.boolean().required(),
});

export { createPostSchema, createTweetSchema, createReelSchema };
