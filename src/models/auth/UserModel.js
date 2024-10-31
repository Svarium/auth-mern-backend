import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please add a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],        
    },
    photo: {
        type: String,
        default: "https://avatars.githubusercontent.com/u/19879005?v=4"
    },
    bio: {
        type: String,
        default: "I am a new user"
    },
    role: {
        type: String,
        enum: ["user", "admin", "creator"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
}, { timestamps: true, minimize: true });

// Hash password before saving
userSchema.pre("save", async function(next) {
    // Check if the password is not modified
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword; // Asignar el hashed password
        next(); // Pasar al siguiente middleware
    } catch (error) {
        next(error); // Manejar el error
    }
});

export default mongoose.model("User", userSchema);
