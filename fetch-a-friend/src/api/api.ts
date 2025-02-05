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
        let filters = {
            breeds: params.breed ? [params.breed] : null,
            ageMin: params.minAge,
            ageMax: params.maxAge,
            sort: `breed:${params.sorted}`,
            size: params.size,
            from: params.from,
            zipCodes: params.zipCodes
        }
        const response = await axios.get(`${apiURL}/dogs/search`,
            {params: filters, withCredentials: true}
        );
        return response.data;
    } catch(e) {
        console.log("Error getting dog IDs", e)
    }
}

export const getDogs = async (dogIds: string[]) => {
    try {
        const response = await axios.post(`${apiURL}/dogs`, dogIds, {withCredentials: true});
        return response.data;
    } catch (e) {
        console.log("Error getting dogs", e)
    }
}

export const getMatch = async (dogIds: string[]) => {
    try {
        const response = await axios.post(`${apiURL}/dogs/match`, dogIds, {withCredentials: true});
        return response.data;
    } catch (e) {
        console.log("Error getting match", e)
    }
}


export const getLocationSearch = async (location: {city: string; state: string}) => {
    try {
        let submissionObj: {city?: string, states?: string[]} = {}
        if(location.city) submissionObj["city"]  = location.city;
        if(location.state) submissionObj["states"]  = [location.state];

        const response = await axios.post(`${apiURL}/locations/search`,
            submissionObj,
            {withCredentials: true});
        return response.data;
    } catch(e) {
        console.log("Error getting locations", e)
    }
}

