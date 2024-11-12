const validator = require("validator");
const UserModel = require("../models/User");

function validateSignUpForm(req) {
  const { username, userEmail, userPassword, firstName, lastName } = req.body;
  if (!username || !userEmail || !userPassword || !firstName || !lastName) {
    throw new Error(
      "One or more required fields are missing to onboard on the platform"
    );
  }

  const isValidEmail = validator.isEmail(userEmail);
  const isValidPassword = validator.isStrongPassword(userPassword);
  const isValidUserName = validator.isLength(username, { min: 3, max: 30 });

  const isValidFirstName = validator.isLength(firstName, { min: 3, max: 24 });
  const isValidLastName = validator.isLength(lastName, { min: 3, max: 24 });

  if (!isValidPassword) {
    throw new Error("Password does not meet the requirement");
  }

  if (
    !isValidEmail ||
    !isValidPassword ||
    !isValidUserName ||
    !isValidFirstName ||
    !isValidLastName
  ) {
    throw new Error("One or more fields are not valid");
  }
}

function validateLogInForm(req) {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    throw new Error("Email and password are required for login");
  }
}

function validateEditForm(req) {
  const allowedEditableField = [
    "firstName",
    "lastName",
    "age",
    "username",
    "gender",
    "photoUrl",
    "bio",
    "skills",
    "location",
  ];

  const editableFieldsToUpdate = Object.keys(req.body);

 

  const isEditAllowed = editableFieldsToUpdate.every((field) =>
    allowedEditableField.includes(field)
  );

  return isEditAllowed;
}

module.exports = {
  validateSignUpForm,
  validateLogInForm,
  validateEditForm
};
