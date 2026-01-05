const User = require('../models/user.model')

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username,
            email,
            password
        })

        await newUser.save();

        res.status(200).json({
            message: "user register successfully",
            newUser
        })

    } catch (error) {
        console.log(error)
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})
    if (!user) {
        res.status(404).json({
            message: "user not found !"
        })
    }
    if (password !== user.password) {
        res.status(500).json({
            message: "invalid credentials !!!"
        })
    }
    res.status(200).json({
        message: "user loggedin successfully."
    });
}

module.exports = { register, login }