const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type:String
    },
    password: {
        type:String
    },
    email : {String},
    nickname: String
});

const User = mongoose.model("user", unimeSchema);
module.exports = User;