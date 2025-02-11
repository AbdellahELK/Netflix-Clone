import { fetchFromTMDB } from "../services/tmdbService.js";

export const getTrendingMovie = async (req, res) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');

        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No trending Movie found" });
        }

        const trendingMovies = data.results[Math.floor(Math.random() * data?.results.length)];

        res.status(200).json({ success: true, content: trendingMovies })
    } catch (error) {
        console.error("Error during fetching trending Movies:", error);
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
        console.error("Error during fetching trailer Movie:", error);
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
        console.error("Error during fetching details tv show:", error);
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
        console.error("Error during fetching similar Movies:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}


export const getMoviesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        const MovieByCategory = data.results;
        res.status(200).json({ success: true, content: MovieByCategory });
    } catch (error) {
        console.error("Error during fetching movies by category:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}