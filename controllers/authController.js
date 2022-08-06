const User = require("../models/user");
const bcrypt = require("bcrypt.js");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const expiry = 3600;


exports.registerNewUser = (req, res) => {
  // fetch user details from req body
  // check if a user with this username exists
  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "a user with this username already exists" });
    }
      // create a new user
    User.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
      },
      (err, newUser) => {
        if (err) {
          return res.status(500).json({ err });
        }
        // hash user's password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.status(500).json({ err });
          }
          bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
            if(err) {
                return res.status(500).json({ err })
            }
            // save password to db
            newUser.password = hashedPassword;
            newUser.save(( err, savedUser) => {
                if(err) {
                    return res.status(500).json({ err })
                }
                // create jwt for user
                jwt.sign(
                    { 
                    id: newUser._id,
                    username: newUser.username,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                    }, SECRET, {expiresIn: expiry }, (err, token) => {
                        if(err) {
                            return res.status(500).json({ err })
                        }
                          // send token to user
                          return res.status(200).json({
                            message: "user registration successful",
                            token
                          })
                    }
                )
            })
          })
        });
      }
    );
  });
  

};

exports.loginUser = (req, res) => {
  // check if user exists
  User.findOne({ username: req.body.username}, 
    (err, foundUser) => {
      if(err) {
        return re.status(500).json(err)
      }
      if(!foundUser) {
        return res.status(401).json({
          message: "Incorrerct username"
        })
      }
      let match = bcrypt.compareSync(req.body.password, foundUser.password);
      if(!match) {
        return res.status(401).json({ 
          message: "Incorrect password"
        })
      }
      jwt.sign({
        id: foundUser.id,
        username: foundUser.username,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
      }, SECRET, {
        expiresIn: expiry
      }, (err, token) => {
        if(err) {
          return res.status(500).json({ err })
        }
        return res.status(200).json({
          message: "user logged in",
          token
        })
      })
    })
  // check if password is correct
  // create a token
  // send token to user
}
