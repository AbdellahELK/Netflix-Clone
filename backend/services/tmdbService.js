import axios from "axios"
import { envVars } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {

    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + envVars.TMDB_API_KEY
        }
    };
    const response = await axios.get(url, options);

    if (response.status !== 200) {
        throw new Error("Faild to fetch data from TMDB " + response.statusText);
    }
    return response.data;
}