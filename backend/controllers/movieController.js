import { fetchFromTMDB } from "../services/tmdbService.js";


export const getTrendingMovie = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data?.results.length)];
        res.status(200).json({ success: true, content: randomMovie });
    } catch (error) {
        console.error("Error during fetching trending movie:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getMovieTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        const trailerVideo = data.results;
        res.status(200).json({ success: true, content: trailerVideo });
    } catch (error) {
        console.error("Error during fetching trailer movie:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getMovieDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        const details = data;
        res.status(200).json({ success: true, content: details });
    } catch (error) {
        console.error("Error during fetching details movie:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getSimilarMovies = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        const similar = data.results;
        res.status(200).json({ success: true, content: similar });
    } catch (error) {
        console.error("Error during fetching similar movies:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getMoviesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        const MoviesByCategory = data;
        res.status(200).json({ success: true, content: MoviesByCategory });
    } catch (error) {
        console.error("Error during fetching movies by category:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}