const asyncHandler = require("express-async-handler")
const Volunteer = require("../models/VolunteerModal")
const {sendMail} = require("../utils/nodmailer");


//@des user apply for volunteer
//@route POST /api/volunteer
//@access public
const applyForVolunteer = asyncHandler(async (req, res) => {
    const {name, surname, age, email, phoneNumber, previouslyApplied, gender} = req.body

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
                    sendMail({name,surname,email})
                    res.status(200).json({
                        success: true,
                        data: {
                            result: null,
                            message: "You successfully applied",
                        },
                        error: null
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

//@des get volunteers
//@route GET /api/ volunteer/see
//@access private
const getVolunteers = asyncHandler(async (req, res) => {
    try {
        const volunteers = await Volunteer.find()

        if (volunteers) {
            res.status(200).json({
                success: true,
                data: {
                    result: volunteers,
                    message: null,
                },
                error: null
            })
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

//@des get volunteers
//@route DELETE /api/ volunteer/see
//@access private
const removeVolunteer = asyncHandler(async (req, res) => {
    const {id} = req.params

    try {
        const volunteer = await Volunteer.findByIdAndDelete({"_id": id})
        console.log(volunteer)
        if (volunteer) {
            res.status(200).json({
                success: true,
                data: {
                    result: null,
                    message: "Volunteer deleted successfully",
                },
                error: null
            })
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

//@des update volunteers
//@route UPDATE /api/volunteer/update
//@access private
const updateVolunteer = asyncHandler(async (req, res) => {
    const {id} = req.params
    try {
        const volunteer = await Volunteer.findById({"_id": id})

        if (volunteer) {
            await Volunteer.findByIdAndUpdate({"_id": id},
                {
                    $set: {
                        "new": false
                    }
                })

            res.status(200).json({
                success: true,
                data: {
                    result: null,
                    message: "Data updated successfully",
                },
                error: null
            })

        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Volunteer not found"
                }
            })
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
    applyForVolunteer,
    getVolunteers,
    removeVolunteer,
    updateVolunteer
}