const mongoose = require("mongoose")

const VolunteerSchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, "Please add name"]
        },
        surname: {
            type: String,
            required: [true, "Please add name"]
        },
        email: {
            type: String,
            required: [true, "Please add email"]
        },
        placeOfStudy: {
            type: String,
            required: [true, "Please add place of study"]
        }
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model("Volunteer", VolunteerSchema)