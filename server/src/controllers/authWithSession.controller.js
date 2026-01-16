const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('../models/user.model')

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
    });

    // Save user id in session
    req.session.userId = user._id;

    res.status(201).json({
      message: "Registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "all fileds are required"
            });
        }
        const isUser = await User.findOne({ email })

        if (!isUser) {
            return res.status(404).json({
                message: "user not exists, please register"
            })
        }

        const userPassword = await bcrypt.compare(password, isUser.password)

        if (!userPassword) {
            return res.status(400).json({
                message: "invalid credentials"
            })
        }

        res.status(200).json({
            message: "user loggedin successfully."
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {login , register} 