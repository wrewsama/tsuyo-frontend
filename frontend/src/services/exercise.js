import http from "../http-common"

export default class DataService {
    static getAllExercises() {
        return http.get('/')
    }

    static findExercise(query) {
        return http.get(`?name=${query}`)
    }
}