const express = require("express")
const router = express.Router()
const {applyForVolunteer, getVolunteers, removeVolunteer, updateVolunteer} = require("../controllers/volunteerController");
const {protect} = require("../middleware/authMiddleware");

router.post("/",applyForVolunteer)
router.get("/see",protect,getVolunteers)
router.delete("/delete/:id",protect,removeVolunteer)
router.put("/update/:id",protect,updateVolunteer)

module.exports = router