import db from "../db/db.js"

class Deck {
    static async getDefaultDecks() {
        try {            
            const result = await db.execute("SELECT * FROM decks WHERE user_id IS NULL AND is_public IS TRUE")
            return result.rows
        } catch(e) {
            console.error("DB connection failed")
        }
    }
}

export default Deck