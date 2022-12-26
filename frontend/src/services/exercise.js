import http from "../http-common"

// weird hack to allow passing in data to work
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

/**
 * Facilitates communication between the frontend and backend API.
 */
export default class DataService {
    
    /**
     * Gets all the Exercises in the database.
     * @returns Object containing an Array with all the exercises in the
     *          exercises field.
     */
    static getAllExercises() {
        return http.get('/exercises')
    }

    /**
     * Gets all the Exercises in the database matching a given query.
     * 
     * @param {String} query The term to match the Exercises to.
     * @returns Object containing an Array with all the exercises in the
     *          exercises field.
     */
    static findExercise(query) {
        return http.get(`/exercises?name=${query}`)
    }

    /**
     * Gets the Exercise matching a given id.
     * 
     * @param {String} id The id of the desired Exercise.
     * @returns The desired Exercise document
     */
    static findExerciseById(id) {
        return http.get(`/exercises/${id}`)
    }

    /**
     * Adds an Exercise to the database.
     * 
     * @param {Object} data A json object repesenting the Exercise to be added.
     * @returns success if the Exercise is successfully added
     *          error otherwise
     */
    static addExercise(data) {
        return http.post("/exercises", data, axiosConfig)
    }

    /**
     * Updates an Exercise in the database.
     * 
     * @param {Object} data A json object containing the fields that need
     *                      to be updated.
     * @returns success if the Exercise is successfully updated
     *          error otherwise
     */
    static updateExercise(data) {
        return http.put("/exercises", data, axiosConfig)
    }

    /**
     * Deletes an Exercise from the database.
     * 
     * @param {String} id The id of the Exercise to be deleted.
     * @returns success if the Exercise is successfully deleted
     *          error otherwise
     */
    static deleteExercise(id) {
        return http.delete(`/exercises?id=${id}`)
    }

    /**
     * Adds a Set to the database.
     * 
     * @param {Object} data Json object representing the Set to be added.
     * @returns success if the Set is successfully added
     *          error otherwise
     */
    static addSet(data) {
        return http.post("/sets", data, axiosConfig)
    }

    /**
     * Adds a Workout to the database.
     * 
     * @param {Object} data Json object representing the Workout to be added.
     * @returns success if the workout is successfully added
     *          error otherwise
     */
    static addWorkout(data) {
        return http.post("/workouts", data, axiosConfig)
    }

    /**
     * Gets all the sets matching the given exercise id.
     * 
     * @param {String} eid The id of the exercise to match to.
     * @returns Object containing an Array with all the sets in the
     *          sets field.
     */
    static getSetsByExerciseId(eid) {
        return http.get(`/sets/${eid}`)
    }

    /**
     * Gets the workout matching a given id.
     * 
     * @param {String} id The id of the desired workout.
     * @returns Document containing the data of the Workout.
     */
    static getWorkoutById(id) {
        return http.get(`/workouts/${id}`)
    }

    /**
     * Deletes a workout from the database.
     * 
     * @param {String} id The id of the workout to be deleted.
     * @returns success if the workout is successfully deleted
     *          error otherwise
     */
    static deleteWorkout(id) {
        return http.delete(`/workouts?id=${id}`)
    }

     /**
     * Deletes a set from the database.
     * 
     * @param {String} id The id of the set to be deleted.
     * @returns success if the set is successfully deleted
     *          error otherwise
     */
    static deleteSet(id) {
        return http.delete(`/sets?id=${id}`)
    }
}