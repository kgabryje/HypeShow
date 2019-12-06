import { TMDB_API_KEY } from "react-native-dotenv";

export const withApiKey = url => url + `?api_key=${TMDB_API_KEY}`;

export const tmdbBaseUrl = "https://api.themoviedb.org/3";
export const discoverShowsUrl = tmdbBaseUrl + "/discover/tv";
