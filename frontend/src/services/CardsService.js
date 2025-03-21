import axios from "axios"

export default class CardsService {
    static async getCards(deckId) {
        const result = await axios.get(`http://192.168.1.5:3000/decks/${deckId}/cards`)
        return result.data
    }
}