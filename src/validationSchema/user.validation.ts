import Joi from "joi";

export const registerUserValidationSchema:Joi.ObjectSchema<any>=Joi.object({
    firstname:Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .messages({
        "any.required":"Please enter firstname",
        'string.empty': 'Firstname cannot be empty',
      'string.min': 'Firstname must be at least 3 characters long',
      'string.max': 'Firstname cannot exceed 50 characters'
    }),
    lastname:Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .messages({
        "any.required":"Please enter lastname",
        'string.empty': 'lastname cannot be empty',
      'string.min': 'lastname must be at least 3 characters long',
      'string.max': 'lastname cannot exceed 50 characters'
    }),

    email:Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .messages({
        "any.required":"Please enter lastname",
        'string.empty': 'lastname cannot be empty',
      'string.min': 'lastname must be at least 3 characters long',
      'string.max': 'lastname cannot exceed 50 characters'
    }),
    username:Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(new RegExp('^[a-zA-Z0-9_]+$')) 
    .required()
    .messages({
        "any.required":"Please enter lastname",
        'string.empty': 'lastname cannot be empty',
      'string.min': 'lastname must be at least 3 characters long',
      'string.max': 'lastname cannot exceed 50 characters'
    }),
    password: Joi.string()
    .trim()
    .min(8)
    .max(30)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'any.required': 'Please enter a password',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 30 characters',
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
    }),
    section: Joi.string()
    .trim()
    .min(8)
    .max(30)
    .pattern(new RegExp('^[a-zA-Z]+$')) 
    .required()
    .messages({
      'any.required': 'Please enter a password',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 30 characters',
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
    })

})