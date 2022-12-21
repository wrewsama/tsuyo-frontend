import http from "../http-common"

export default class DataService {
    static getAllExercises() {
        return http.get('/exercises')
    }

    static findExercise(query) {
        return http.get(`/exercises?name=${query}`)
    }
}