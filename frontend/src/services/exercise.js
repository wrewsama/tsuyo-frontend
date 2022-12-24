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

    static findExerciseById(id) {
        return http.get(`/exercises/${id}`)
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

    static addSet(data) {
        return http.post("/sets", data, axiosConfig)
    }

    static addWorkout(data) {
        return http.post("/workouts", data, axiosConfig)
    }

    static getSetsByExerciseId(eid) {
        return http.get(`/sets/${eid}`)
    }
}