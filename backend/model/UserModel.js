const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { UserSchema } = require("../schemas/UserSchema");

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "username",
  errorMessages: {
    UserExistsError: "A user with the given username is already registered",
  },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
