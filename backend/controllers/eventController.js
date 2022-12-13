const asyncHandler = require("express-async-handler")
const Event = require("../models/EventModel")

//@desc Create new event
//@route POST /api/event
//@access private
const event = asyncHandler(async (req, res) => {
    const {type, name, description, date, place} = req.body
    try {
        if (!type || !name || !description || !date || !place) {
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
    const {id} = req.body

    try {
        const event = await Event.findByIdAndDelete(id)
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


module.exports = {
    event,
    get,
    remove
}