import axios from "axios"

export default class DecksService {
        static async getDecks() {
        const result = await axios.get("http://192.168.1.5:3000/decks")
        return result.data
    }
} 

