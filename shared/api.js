export const withApiKey = url => url + `?api_key=${process.env.TMDB_API_KEY}`;

export const tmdbBaseUrl = "https://api.themoviedb.org/3";
export const discoverShowsUrl = tmdbBaseUrl + "/discover/tv";
