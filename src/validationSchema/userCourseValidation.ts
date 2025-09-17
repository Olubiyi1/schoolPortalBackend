import Joi from "joi";

export const userCourseValidationSchema: Joi.ObjectSchema<any>=Joi.object({
    courseTitle: Joi.string()
    .trim()
    .min(3)
    .required()
    .messages({
        "any.required":"Please enter course name",
        "string.empty" : "Course title cannot be empty",
        "string.min": "course tilte cannot be less than 3 characters"
    }),

    courseCode: Joi.string()
    .trim()
    .min(3)
    .messages({
        "string.any": "Please enter your course code",
        "string.empty":"course code cannot be blank",
        "string.min" : "Course code cannot be less than 3 characters"
    }),

    level: Joi.string()
    .trim()
    .min(3)
    .messages({
        "required.any" : "Pleae enter your level",
        "string.empty": "Level cannot be empty",
        "string.min" : "Level cannot be less than 3 characters"
    })

})