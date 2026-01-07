const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// const register = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const newUser = new User({
//             username,
//             email,
//             password
//         })

//         await newUser.save();

//         res.status(200).json({
//             message: "user register successfully",
//             newUser
//         })

//     } catch (error) {
//         console.log(error)
//     }
// }


// const login = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({email})
//     if (!user) {
//         res.status(404).json({
//             message: "user not found !"
//         })
//     }
//     if (password !== user.password) {
//         res.status(500).json({
//             message: "invalid credentials !!!"
//         })
//     }
//     res.status(200).json({
//         message: "user loggedin successfully."
//     });
// }







// ================ security practices (hashed password)========================= //


// const register = async (req, res) => {
//     try {
// const { username, email, password } = req.body;

// const isExists = await User.findOne({ email })
// if (isExists) {
//     return res.status(409).json({
//         message: "user exists already."
//     })
// }

// if (!username || !email || !password) {
//     return res.status(400).json({
//         message: "all fields are required"
//     })
// }


// const hashedPassword = await bcrypt.hash(password, 10)

// const newUser = new User({
//     username,
//     email,
//     password: hashedPassword
// })
// await newUser.save();

//         res.status(200).json({
//             message: "user registerd",
//             newUser
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message: "server crached !!!"
//         });
//     }

// }



// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "all fileds are required"
//             });
//         }
//         const isUser = await User.findOne({ email })

//         if (!isUser) {
//             return res.status(404).json({
//                 message: "user not exists, please register"
//             })
//         }

//         const userPassword = await bcrypt.compare(password, isUser.password)

//         if (!userPassword) {
//             return res.status(400).json({
//                 message: "invalid credentials"
//             })
//         }

//         res.status(200).json({
//             message: "user loggedin successfully."
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }





// ==================== cookie and jwt ================ //

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }
        const isExists = await User.findOne({ email })
        if (isExists) {
            return res.status(409).json({
                message: "user exists already."
            })
        }



        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save();

        const token = jwt.sign(
            { email },
            process.env.JWT_SECURITY,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, {
            httpOnly: true
        })

        res.status(200).json({
            message: "user registerd.", newUser
        })
    } catch (error) {
        console.log(error)
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "all credentials are required"
            });
        }

        const isUser = await User.findOne({ email })

        if (!isUser) {
            return res.status(404).json({
                message: "not found"
            })
        }
        const pass = await bcrypt.compare(password, isUser.password)

        if (!pass) {
            return res.status(400).json({
                message: "wrong password"
            })
        }

        const token = jwt.sign({ email },
            process.env.JWT_SECURITY,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, { httpOnly: true });

        res.status(200).json({
            message: "user logged in"
        })
    } catch (error) {
        console.log(error)
    }
}
const profile = async (req, res) => {
    res.status(200).json({ user: req.user })
}

const isLoggedIn = (req, res) => {

    try {
        const token = req.cookies.token;
        if (!token) return res.status(400).json({
            authenticated: false,
            message: "didn't get token"
        })
        const user = jwt.verify(token, process.env.JWT_SECURITY)

        res.status(200).json({ authenticated: true })
    } catch (error) {
        res.status(400).json({ authenticated: false })
    }
}


module.exports = { register, login, profile, isLoggedIn }