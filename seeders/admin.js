const User = require("../models/user");
const { use } = require("../routes/authRoutes");
const bcrypt = require('bcrypt');
let password = "admin190"

exports.seedAdmin = () => {
    if(err) throw err 
    if(admin) return "admin account already exists"
}
User.create({
    firstName: "larry",
    lastName: "King",
    username: "mansa",
    role: "admin"
}, (err, user) => {
    if(err) throw err 
    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) throw err
            user.password = hash;
            user.save((err, savedUser) => {
                if(err) throw err
                return "admin account created"
            })
        })
    })
})