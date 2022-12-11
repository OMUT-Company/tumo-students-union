const express = require("express")
const {registration, login, me} = require("../controllers/adminController");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router()

router.post("/", registration)
router.post("/login", login)
router.get("/me", protect, me)

module.exports = router