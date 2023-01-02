import http from "../http-common"

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
    static getAllExercises(token) {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        return http.get('/exercises', config)
    }

    /**
     * Gets all the Exercises in the database matching a given query.
     * 
     * @param {String} query The term to match the Exercises to.
     * @returns Object containing an Array with all the exercises in the
     *          exercises field.
     */
    static findExercise(query, token) {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        return http.get(`/exercises?name=${query}`, config)
    }

    /**
     * Gets the Exercise matching a given id.
     * 
     * @param {String} id The id of the desired Exercise.
     * @returns The desired Exercise document
     */
    static findExerciseById(id, token) {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        return http.get(`/exercises/${id}`, config)
    }

    /**
     * Adds an Exercise to the database.
     * 
     * @param {Object} data A json object repesenting the Exercise to be added.
     * @returns success if the Exercise is successfully added
     *          error otherwise
     */
    static addExercise(data, token) {
        let config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`
            }
        }
        return http.post("/exercises", data, config)
    }

    /**
     * Updates an Exercise in the database.
     * 
     * @param {Object} data A json object containing the fields that need
     *                      to be updated.
     * @returns success if the Exercise is successfully updated
     *          error otherwise
     */
    static updateExercise(data, token) {
        let config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`
            }
        }
        return http.put("/exercises", data, config)
    }

    /**
     * Deletes an Exercise from the database.
     * 
     * @param {String} id The id of the Exercise to be deleted.
     * @returns success if the Exercise is successfully deleted
     *          error otherwise
     */
    static deleteExercise(id, token) {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        return http.delete(`/exercises?id=${id}`, config)
    }

    /**
     * Adds a Set to the database.
     * 
     * @param {Object} data Json object representing the Set to be added.
     * @returns success if the Set is successfully added
     *          error otherwise
     */
    static addSet(data, token) {
        let config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`
            }
        }
        return http.post("/sets", data, config)
    }

    /**
     * Adds a Workout to the database.
     * 
     * @param {Object} data Json object representing the Workout to be added.
     * @returns success if the workout is successfully added
     *          error otherwise
     */
    static addWorkout(data, token) {
        let config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`
            }
        }
        return http.post("/workouts", data, config)
    }

    /**
     * Gets all the sets matching the given exercise id.
     * 
     * @param {String} eid The id of the exercise to match to.
     * @returns Object containing an Array with all the sets in the
     *          sets field.
     */
    static getSetsByExerciseId(eid, token) {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        return http.get(`/sets/${eid}`, config)
    }

    /**
     * Gets the workout matching a given id.
     * 
     * @param {String} id The id of the desired workout.
     * @returns Document containing the data of the Workout.
     */
    static getWorkoutById(id, token) {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        return http.get(`/workouts/${id}`, config)
    }

    /**
     * Deletes a workout from the database.
     * 
     * @param {String} id The id of the workout to be deleted.
     * @returns success if the workout is successfully deleted
     *          error otherwise
     */
    static deleteWorkout(id, token) {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        return http.delete(`/workouts?id=${id}`, config)
    }

     /**
     * Deletes a set from the database.
     * 
     * @param {String} id The id of the set to be deleted.
     * @returns success if the set is successfully deleted
     *          error otherwise
     */
    static deleteSet(id, token) {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        return http.delete(`/sets?id=${id}`, config)
    }

    /**
     * Updates a Set in the database.
     * 
     * @param {Object} data A json object containing the fields that need
     *                      to be updated.
     * @returns success if the Set is successfully updated
     *          error otherwise
     */
    static updateSet(data, token) {
        let config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`
            }
        }
        return http.put("/sets", data, config)
    }
}