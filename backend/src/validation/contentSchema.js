import Joi from "joi";

const tweetSchema = Joi.object({
  content: Joi.string()
    .min(10)
    .max(1000)
    .messages({
      "string.min": "tweet content must have at least 10 characters",
      "string.max": "tweet content must less then 1000 characters",
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
    })
    .required(),
});

export { commentSchema, tweetSchema };
