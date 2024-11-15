const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');


const validator = require("validator");
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email " + value);
        }
      },
    },
    hashPassword: {
      type: String,
      required:true
    },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 24,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 24,
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    gender: {
      type: String,
      validate(value) {
        const enumVlaue = ["male", "female", "other"];
        if (![...enumVlaue].includes(value)) {
          throw new Error("gender must be male, female or other");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://imgs.search.brave.com/JWoO8Nmi6nM13kolts_K_iTaodJJZwcD6cIpgH8erUM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by8zZC1hdmF0YXIt/Y2FydG9vbi1jaGFy/YWN0ZXJfMTEzMjU1/LTkzMjgzLmpwZz9z/ZW10PWFpc19oeWJy/aWQ",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL " + value);
        }
      },
    },
    bio: {
      type: String,
      minLength: 4,
      maxLength: 500,
    },
    skills: {
      type: [String],
    },
    location: {
      type: String,
    },
    links: {
      github: {
        type: String,
        match: /^(https?:\/\/)?github\.com\/\w+(\/\w+)*$/,
      },
      linkedin: {
        type: String,
        match: /^(https?:\/\/)?linkedin\.com\/in\/\w+(\/\w+)*$/,
      },
      portfolio: {
        type: String,
        match: /^(https?:\/\/)?[\w-]+(\.[\w-]+)*\.[^\s@]+$/,
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = function() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "devTinder", { expiresIn: "7d" });
  return token;
}

userSchema.methods.comparePassword = async function (passwordInputByUser){

  const user = this;
  const hashPassword = user.hashPassword;
  const isPasswordValid = await bcrypt.compare(
   passwordInputByUser,
    hashPassword
  );

  

  return isPasswordValid;
}




module.exports = mongoose.model("User", userSchema);
