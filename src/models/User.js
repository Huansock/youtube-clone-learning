import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    socialOnly: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: false,

    },
    name: {
        type: String,
        required: true,
    },
    location: String,
    avatarUrl: {
        type: String,

    }

})
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model('User', userSchema);
export default User;