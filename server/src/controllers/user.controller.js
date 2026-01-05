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

module.exports = { register }