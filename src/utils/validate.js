const validator = require('validator');
const UserModel = require('../models/User');


function validateSignUpForm(req){
    const {username , emailId , hashPassword ,firstName , lastName}  = req.body;
    console.log(req.body)
    if(!username || !emailId || !hashPassword ||!firstName || !lastName){
        throw new Error('One or more required fields are missing to onboard on the platform')
    }

    const isValidEmail = validator.isEmail(emailId);
    const isValidPassword = validator.isStrongPassword(hashPassword);
    const isValidUserName = validator.isLength(username , {min:3 , max:30});

    const isValidFirstName= validator.isLength(firstName , {min:3 , max:24});
    const isValidLastName= validator.isLength(lastName , {min:3 , max:24});

    if(!isValidPassword){
        throw new Error('Password does not meet the requirement')
    }

    if(!isValidEmail || !isValidPassword || !isValidUserName || !isValidFirstName || !isValidLastName){
        throw new Error('One or more fields are not valid')
    }
}

function validateLogInForm(req){
    const {userEmail, userPassword} = req.body;

    if(!userEmail || !userPassword){
        throw new Error('Email and password are required for login');
    }
}


module.exports = {
    validateSignUpForm,
    validateLogInForm
}
