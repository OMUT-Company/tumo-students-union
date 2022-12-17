const asyncHandler = require("express-async-handler")
const bcrypt = require('bcryptjs')
const {generateToken} = require("../utils/generateToken")

const Admin = require("../models/AdminModel")
const Organisation = require("../models/OrganizationModel")

//@desc Register new admin
//@route POST /api/admin
//@access public
const registration = asyncHandler(async (req, res) => {
    const {name, surname, email, password} = req.body

    if (!name || !surname || !email || !password) {
        res.status(400).json({
            success: false,
            data: null,
            error: {
                message: "All fields are required"
            }
        })
    }

    //check if admin exists
    const adminExist = await Admin.findOne({email})

    if (adminExist) {
        res.status(400).json({
            success: false,
            data: null,
            error: {
                message: "Admin already exists"
            }
        })
    } else {
        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create admin
        const admin = await Admin.create({
            name,
            surname,
            email,
            password: hashedPassword,
            verify: true
        })

        if (admin) {
            res.status(200).json({
                success: true,
                data: {
                    result: null,
                    message: "Admin added successfully"
                },
                error: null
            })
        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Something went wrong"
                }
            })
        }
    }
})

//@desc Login admin
//@route POST /api/admin/login
//@access public
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const admin = await Admin.findOne({email})
console.log(email,password)
    if (admin && (await bcrypt.compare(password, admin.password))) {
        if (admin.verify) {
            const data = {
                id: admin._id,
                name: admin.name,
                surname: admin.surname,
                email: admin.email,
                token: generateToken(admin._id)
            }

            res.status(200).json({
                success: true,
                data: {
                    result: data,
                    message: null
                },
                error: null
            })
        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Unapproved Email"
                }
            })
        }
    } else {
        res.status(400).json({
            success: false,
            data: null,
            error: {
                message: "Invalid credentials"
            }
        })
    }
})

//@desc Get Admin details
//@route GET /api/admin/me
//@access private
const me = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            result: req.admin,
            message: null
        },
        error: null
    })
})

module.exports = {
    registration,
    login,
    me,
}