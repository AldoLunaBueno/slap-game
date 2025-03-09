import express from "express"
import deckController from "../controllers/deckController.js"
import cardController from "../controllers/cardController.js"

const router = express.Router()

router.get("/", deckController)
router.get("/:deckId/cards", cardController)

export default router