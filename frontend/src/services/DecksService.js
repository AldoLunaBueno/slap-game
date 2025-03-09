import axios from "axios"

export default class DecksService {
        static async getDecks() {
        const result = await axios.get("http://localhost:3000/decks")
        return result.data
    }
} 

