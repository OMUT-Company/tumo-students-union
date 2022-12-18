const express = require("express")
const router = express.Router()
const {applyForVolunteer} = require("../controllers/volunteerController");

router.post("/",applyForVolunteer)

module.exports = router