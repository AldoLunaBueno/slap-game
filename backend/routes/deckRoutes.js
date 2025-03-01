import express from "express"
import deckController from "../controllers/deckController.js"

const router = express.Router()

router.get("/", deckController)

export default router