const asyncHandler = require("express-async-handler")
const Event = require("../models/EventModal")
const Volunteer = require("../models/VolunteerModal")
const {sendMail} = require("../utils/nodmailer");

//@desc Create new event
//@route POST /api/event
//@access private
const event = asyncHandler(async (req, res) => {
    const {type, name, description, date, place, financiers} = req.body

    try {
        if (!type.en || !name.en || !description.en || !date.from || !date.to || !place || !financiers.length) {
            res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "All fields are required"
                }
            })
        } else {
            const createdEvent = await Event.create(req.body)
            if (createdEvent) {
                res.status(201).json({
                    success: true,
                    data: {
                        result: null,
                        message: "The event was created successfully"
                    },
                    error: null
                })
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

//@desc Get all events
//@route GET /api/event/get
//@access public
const get = asyncHandler(async (req, res) => {
    try {
        const events = await Event.find()
        res.status(200).json({
            success: true,
            data: {
                result: events,
                message: null,
            },
            error: false
        })
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

//@desc Delete current events
//@route DELETE /api/event/get
//@access private
const remove = asyncHandler(async (req, res) => {
    const {id} = req.params

    try {
        const event = await Event.findByIdAndDelete({"_id": id})
        if (event) {
            res.status(200).json({
                success: true,
                data: {
                    result: null,
                    message: "The event was deleted successfully",
                    error: null
                }
            })
        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "The event wasn't deleted"
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

//@desc Submit to events
//@route POST /api/event/voluntarily
//@access public
const applyAnEvent = asyncHandler(async (req, res) => {
    const {eventId, name, surname, previouslyApplied, email, age, phoneNumber, gender} = req.body

    try {
        const isVolunteer = await Volunteer.find({email})

        if (!isVolunteer.length) {
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
                const event = await Event.findById({"_id": eventId})

                event.volunteers.push(volunteer._id)

                const newEventApply = await Event.updateOne({
                    "_id": eventId
                }, {
                    $set: {
                        "volunteers": event.volunteers
                    }
                })

                if (newEventApply) {
                    sendMail({name,surname,email})
                    res.status(200).json({
                        success: true,
                        data: {
                            result: null,
                            message: "You successfully applied for event",
                            error: null
                        }
                    })
                }
            } else {

                res.status(400).json({
                    success: false,
                    data: null,
                    error: {
                        message: "Something went wrong"
                    }
                })
            }
        } else {
            const event = await Event.findById({"_id": eventId})

            if (!event.volunteers.includes(isVolunteer[0]._id)) {
                event.volunteers.push(isVolunteer[0]._id)

                const newEventApply = await Event.updateOne({
                    "_id": eventId
                }, {
                    $set: {
                        "volunteers": event.volunteers
                    }
                })

                if (newEventApply) {
                    sendMail({name,surname,email})
                    res.status(200).json({
                        success: true,
                        data: {
                            result: null,
                            message: "You successfully applied for event",
                            error: null
                        }
                    })
                }
            } else {
                res.status(400).json({
                    success: false,
                    data: null,
                    error: {
                        message: "You have already applied to this event"
                    }
                })
            }
        }
    } catch (error) {
        console.log(error)
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
    event,
    get,
    remove,
    applyAnEvent
}