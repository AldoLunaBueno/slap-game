import db from "../db/db.js"

class Card {
    static async getCardsByDeckId(deckId) {
        const result = await db.execute({
            sql: "SELECT * FROM cards WHERE deck_id = ?",
            args: [deckId],
        })
        return result.rows
    }
}

export default Card