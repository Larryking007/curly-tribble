const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { SECRET } = process.env;

// @route GET api/auth/
// @desc Auth user(staff, manager, user) and get token
// @access Public
exports.getLoggedInUser = async (req, res) => {
  try {
    // Get user from db
    const user = await User.findById(req.user.id).select("-password");

    // return user
    res.json({
        statusCode: 200,
        message: "User gotten succesfully",
        user
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Internal Server Error")
    }
};

// @route POST api/auth/login
// @desc Auth user(staff, manager, admin) and get token
// @access Public

exports.loginUser = async (req, res) => {
  const errors = validatioResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  // else
  //   destructure request body
  const { email, password } = req.body;

  try {
    // initiate user
    let user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ statusCode: 400, message: "Invalid credentials" });

    // else
    //  check the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid credentials",
      });

    //   else
    // there's a match
    // send payload and sign token
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          statusCode: 200,
          message: "Logged in successfully",
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userRole: user.userRole,
            isManager: user.isManager,
            isAdmin: user.isAdmin,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(err.message);

    res.status(500).send("Internal Server Error");
  }
};
