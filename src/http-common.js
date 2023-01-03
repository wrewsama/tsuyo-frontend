import axios from "axios"

export default axios.create({
    baseURL: "https://tsuyo-api.onrender.com/api/v1/tsuyo",
    headers: {
        "Content-type": "application.json"
    }
})