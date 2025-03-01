import express from "express"
import initDB from "./db/initDB.js"
import deckRoutes from "./routes/deckRoutes.js"
const app = express()

app.listen(3000, () => {
    console.log("server is up and listening to port 3000")
})

app.use(express.json())


app.get("/", (req, res) => {
    res.send("<h1>Slap Game</h1>")
})

app.use("/decks", deckRoutes)

/**
 * Routes:
 * Gameplay:
 * GET /decks
 * GET /decks/:deckId
 * GET /decks/:deckId/cards
 * GET /modes
 * 
 * Creation:
 * POST /decks
 * PUT  /decks/:deckId
 * 
 * 
 */

// initDB()