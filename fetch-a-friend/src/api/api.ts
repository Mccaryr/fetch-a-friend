import axios from 'axios';

const apiURL = "https://frontend-take-home-service.fetch.com"

export const getDogBreeds = async () => {
    try {
        const response = await axios.get(`${apiURL}/dogs/breeds`, {withCredentials: true});
        return response.data;
    } catch(e) {
        console.log("Error getting dogs", e)
    }
}

export const getDogsSearch = async (params: any) => {
    try {
        /**
         * optional params
         * breeds - an array of breeds
         * zipCodes - an array of zip codes
         * ageMin - a minimum age
         * ageMax - a maximum age **/

        /**
         * size - the number of results to return; defaults to 25 if omitted
         from - a cursor to be used when paginating results (optional)
         sort - the field by which to sort results, and the direction of the sort; in the format sort=field:[asc|desc].
         results can be sorted by the following fields:
         breed
         name
         age
         Ex: sort=breed:asc **/

        const response = await axios.get(`${apiURL}/dogs/search`, params);
        return response.data;
    } catch(e) {
        console.log("Error getting dog IDs", e)
    }
}

export const getDogs = async (dogIds: string[]) => {
    try {
        const response = await axios.post(`${apiURL}/dogs`, {dogIds});
        return response.data;
    } catch (e) {
        console.log("Error getting dogs", e)
    }
}

export const getMatch = async (dogIds: string[]) => {
    try {
        const response = await axios.get(`${apiURL}/dogs/${dogIds}`);
        return response.data;
    } catch (e) {
        console.log("Error getting match", e)
    }
}

export const getLocations = async () => {
    try {
        const response = await axios.get(`${apiURL}/locations`);
        return response.data;
    } catch(e) {
        console.log("Error getting locations", e)
    }
}

export const getLocationSearch = async () => {
    try {
        const response = await axios.get(`${apiURL}/locations/search`);
        return response.data;
    } catch(e) {
        console.log("Error getting locations", e)
    }
}

