const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const Admin = require("../models/AdminModel")

const protect = asyncHandler(async (req, res, next) => {
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                //Get token from header
                token = req.headers.authorization.split(" ")[1]
                //Verify token
                const decode = jwt.verify(token, process.env.JWT_SECRET)
                //Get user from the token
                req.admin = await Admin.findById(decode.id).select("-password")

                next()
            } catch (error) {
                res.status(401).json({
                    success: false,
                    data: null,
                    error: {
                        message: "Not authorized"
                    }
                })
            }
        } else {
            res.status(401).json({
                success: false,
                data: null,
                error: {
                    message: "No authorized, no token"
                }
            })
        }
    }
)

module.exports = {protect}