const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
  },
  { timestamps: true }
);

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "username",
  errorMessages: {
    UserExistsError: "A user with the given username is already registered",
  },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
