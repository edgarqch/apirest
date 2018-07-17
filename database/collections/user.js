const mongoose = require("../connect");
var userSchema = {
    name: String,
    password: String,
    email: String,
    sexo: String
};
var user = mongoose.model("user", userSchema);
module.exports = user;