import Card from "../models/card.js"

async function getCardsByDeckId(req, res) {
    try {
        const result = await Card.getCardsByDeckId(req.params.deckId)
        res.json(result)
    } catch(e) {
        console.log(e)
        res.status(500).json({error: "Error to fetch cards"})
    }
}

export default getCardsByDeckId