const asyncHandler = require("express-async-handler")
const Volunteer = require("../models/VolunteerModal")


//@des user apply for volunteer
//@route POST /api/volunteer
//@access public
const applyForVolunteer = asyncHandler(async (req, res) => {
    const {name, surname, age, email, phoneNumber, previouslyApplied,gender} = req.body

    try {
        if (!name || !surname || !age || !email || !phoneNumber) {
            res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "All fields are required"
                }
            })
        } else {
            const isVolunteer = await Volunteer.findOne({email})
            if (isVolunteer) {
                res.status(400).json({
                    success: false,
                    data: null,
                    error: {
                        message: "You have already applied"
                    }
                })
            } else {
                const volunteer = await Volunteer.create({
                    name,
                    surname,
                    age,
                    phoneNumber,
                    previouslyApplied,
                    email,
                    gender
                })

                if (volunteer) {
                    res.status(200).json({
                        success: true,
                        data: {
                            result: null,
                            message: "You successfully applied",
                            error: null
                        }
                    })
                }
            }
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            error: {
                message: "Something went wrong"
            }
        })
    }
})

module.exports = {
    applyForVolunteer
}