const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) return res.status(400).json({
        message: "not authorized"
    });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECURITY)
        req.user = decoded;
        next()
    } catch (error) {
        return res.json({
            message: "not authorized."
        })
    }
} 

module.exports = { auth }
