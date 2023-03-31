const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // username: { typess: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // image: { type: String, required: true },
    // createdAt: { type: Date, default: moment().toDate() },
});
module.exports = mongoose.model("Users", userSchema);
