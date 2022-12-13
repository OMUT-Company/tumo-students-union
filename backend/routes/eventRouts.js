const express = require("express")
const {protect} = require("../middleware/authMiddleware");
const {event, get, remove} = require("../controllers/eventController");
const router = express.Router()

router.post("/", protect, event)
router.get("/get", get)
router.delete("/remove", remove)

module.exports = router