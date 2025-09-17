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
    surname:Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .messages({
        "any.required":"Please enter surname",
        'string.empty': 'surname cannot be empty',
      'string.min': 'surname must be at least 3 characters long',
      'string.max': 'surname cannot exceed 50 characters'
    }),

    email:Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .messages({
        "any.required":"Please enter email",
        'string.empty': 'email cannot be empty',
      'string.min': 'email must be at least 3 characters long',
      'string.max': 'email cannot exceed 50 characters'
    }),

    username:Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(new RegExp('^[a-zA-Z0-9_]+$')) 
    .required()
    .messages({
        "any.required":"Please enter username",
        'string.empty': 'username cannot be empty',
      'string.min': 'username must be at least 3 characters long',
      'string.max': 'username cannot exceed 50 characters'
    }),

    password: Joi.string()
    .trim()
    .min(8)
    .max(30)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$'))
    .required()
    .messages({
      'any.required': 'Please enter a password',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 30 characters',
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
    }),

    department: Joi.string()
    .trim()
    .pattern(new RegExp('^[a-zA-Z ]+$')) 
    .required()
    .messages({
      'any.required': 'Please enter a department',
      'string.empty': 'department cannot be empty',
      'string.min': 'department must be at least 10 characters long',
      'string.max': 'department cannot exceed 30 characters',
      'string.pattern.base': 'department can not contain special characters, number'
    }),

    level: Joi.string()
    .trim()
    .required()
    .messages({
      'any.required': "Please enter your level",
      'string.empty' : 'depatment cannot be empty',
    })

})


export const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string().required()
});
