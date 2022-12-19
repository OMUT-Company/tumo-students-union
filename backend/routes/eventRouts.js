const express = require("express")
const {protect} = require("../middleware/authMiddleware");
const {event, get, remove, applyAnEvent} = require("../controllers/eventController");
const router = express.Router()

router.post("/", protect, event)
router.get("/see", get)
router.delete("/remove/:id",protect, remove)
router.post("/apply", applyAnEvent)

module.exports = router