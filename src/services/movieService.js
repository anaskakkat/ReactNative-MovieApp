import axios from "axios";
import { TMDB_API_KEY } from "@env";
import {
  TMDB_BASE_URL,
  TMDB_IMAGE_BASE_URL,
  ENDPOINTS,
  YOUTUBE_BASE_URL,
} from "../constants/Urls";
import Languages from "../constants/Languages";

// console.log("TMDB_API_KEY:", TMDB_API_KEY);

// Base Axios instance for TMDB API requests
const TMDB_HTTP_REQUEST = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY, // Use API key here if it's v3 auth
    language: "en-US",
  },
});

// General function to handle GET requests with error handling
const getRequest = async (endpoint, additionalParams = {}) => {
  try {
    const response = await TMDB_HTTP_REQUEST.get(endpoint, {
      params: additionalParams,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error.message);
    return { error: "An error occurred while fetching data." };
  }
};

// Individual API functions using the base GET request handler
export const getNowPlayingMovies = () =>
  getRequest(ENDPOINTS.NOW_PLAYING_MOVIES);
export const getUpcomingMovies = () => getRequest(ENDPOINTS.UPCOMING_MOVIES);
export const getTopRatedMovies = () => getRequest(ENDPOINTS.TOP_RATED);
export const getMovieById = (movieId, append_to_response = "") =>
  getRequest(
    `${ENDPOINTS.MOVIE}/${movieId}`,
    append_to_response ? { append_to_response } : {}
  );
export const getAllGenres = () => getRequest(ENDPOINTS.GENRES); // Dynamic genre fetching function

// Utility functions for constructing URLs
export const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;
export const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;
export const getLanguage = (language_iso) =>
  Languages.find((language) => language.iso_639_1 === language_iso);
