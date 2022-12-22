import http from "../http-common"

// weird hack to allow http post method to work
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

export default class DataService {
    
    static getAllExercises() {
        return http.get('/exercises')
    }

    static findExercise(query) {
        return http.get(`/exercises?name=${query}`)
    }

    static addExercise(data) {
        return http.post("/exercises", data, axiosConfig)
    }

    static updateExercise(data) {
        return http.put("/exercises", data, axiosConfig)
    }

    static deleteExercise(id) {
        return http.delete(`/exercises?id=${id}`)
    }
}