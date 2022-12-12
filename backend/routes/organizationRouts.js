const express = require("express")
const router = express.Router()

const {protect} = require("../middleware/authMiddleware");
const {
    create,
    get,
    update,
    deleted,
    offer,
    getOffers,
    confirmOffer,
    refuseOffer
} = require("../controllers/organizationController")

router.post("/", protect, create)
router.get("/get", protect, get)
router.put("/update", protect, update)
router.delete("/deleted", deleted)
router.post("/offer", offer)
router.get("/offer/get", protect, getOffers)
router.post("/offer/confirm", protect, confirmOffer)
router.delete("/offer/refused", protect, refuseOffer)

module.exports = router