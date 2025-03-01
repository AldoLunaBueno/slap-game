import Deck from "../models/deck.js"

async function getDefaultDecks(req, res) {
    try {
        const result = await Deck.getDefaultDecks()
        res.json(result)
    } catch(e) {
        console.log(e)
        res.status(500).json({error: "Error to fetch decks"})
    }
}

export default getDefaultDecks