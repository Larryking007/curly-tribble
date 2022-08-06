const mongoose = require('mongoose');

const USerSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        },
        userRole: {
            type: String,
            enum: ["admin", "manager", "staff", "student", "not assigned"],
            default: "not assigned"
        },
        isManager: {
            type: Boolean,
            default: 0
        },
        isAdmin: {
            type: Boolean,
            default: 0
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User, UserSchema");