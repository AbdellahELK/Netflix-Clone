import { fetchFromTMDB } from "../services/tmdbService.js";

export const getTrendingTv = async (req, res) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US');

        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No trending TV shows found" });
        }

        const trendingTv = data.results[Math.floor(Math.random() * data?.results.length)];

        res.status(200).json({ success: true, content: trendingTv })
    } catch (error) {
        console.error("Error during fetching trending tv:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getTvTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        const trailerVideo = data.results;
        res.status(200).json({ success: true, content: trailerVideo });
    } catch (error) {
        console.error("Error during fetching trailer tv:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getTvDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        const details = data;
        res.status(200).json({ success: true, content: details });
    } catch (error) {
        console.error("Error during fetching details tv show:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}


export const getSimilarTvs = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        const similar = data.results;
        res.status(200).json({ success: true, content: similar });
    } catch (error) {
        console.error("Error during fetching similar tv shows:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}


export const getTvsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        const TvshowsByCategory = data.results;
        res.status(200).json({ success: true, content: TvshowsByCategory });
    } catch (error) {
        console.error("Error during fetching tv shwos by category:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}