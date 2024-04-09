const { body, validationResult } = require('express-validator');

// Register Validator 
const authValidator = [
    body('username')
        .notEmpty()
        .custom(value => !/\s/.test(value)) // test if space is not present
        .withMessage('username is required')
        .isString()
        .withMessage('username must be a string')
        .isLength({min: 4})
        .withMessage('The username length must be at least 4 characters'),
    body('password')
        .notEmpty()
        .custom(value => !/\s/.test(value))
        .withMessage('password is required')
        .isLength({min: 6, max: 8})
        .withMessage('The password length must be between 6 and 8 characters')
];

// requestToken validator
const refrehTokenValidator = [
    body('requestToken')
        .notEmpty() 
        .custom(value => !/\s/.test(value))
        .withMessage('The field is required')
        .isUUID(4)
        .withMessage('Invalid data format')
];

// createTask validator
const createTaskValidator = [
    body('title')
        .notEmpty() 
        .custom(value => /^\w|\d$/.test(value))
        .withMessage('title field is required')
        .isString()
        .withMessage('title field must be a string')
        .isLength({min: 4,})
        .withMessage('The title length must be at least 4 characters'),
    body('description') // cant be empty
        .notEmpty() 
        .custom(value => /^\w|\d$/.test(value)) // test if content at least a word or number
        .withMessage('description field is required')
        .isString()
        .withMessage('description field must be a string'), 
    body('endDate')
        .notEmpty()
        .custom(value => /^\w|\d$/.test(value))
        .withMessage('endDate field is required')
        .isString()
        .withMessage('endDate field must be a string'), 
    body('priority')
        .notEmpty()
        .custom(value => !/\s/.test(value)) 
        .withMessage('priority field is required')
        .isString()
        .withMessage('priority field must be a string'),              
];

// editTask validator
const editTaskValidator = [
    body('id')
        .exists()
        .custom(value => !/\s/.test(value))
        .withMessage('required field')
        .isNumeric()
        .withMessage('Incorrect value'),
    createTaskValidator,
]


// Use of validators
const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    next();
};

module.exports = {
    authValidator,
    refrehTokenValidator,
    createTaskValidator,
    editTaskValidator,
    validator
};