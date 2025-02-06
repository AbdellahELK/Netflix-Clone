import User from "../models/userModel.js";
import { fetchFromTMDB } from "../services/tmdbService.js";


export const searchPerson = async (req, res) => {
    const query = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No results found" });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].profile_path,
                    title: data.results[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                }
            }
        });

        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error("Error during searching a person:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
export const searchMovie = async (req, res) => {
    const query = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No results found" });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].title,
                    searchType: "movie",
                    createdAt: new Date(),
                }
            }
        });

        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error("Error during searching a movie:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const searchTv = async (req, res) => {
    const query = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No results found" });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].name,
                    searchType: "tv",
                    createdAt: new Date(),
                }
            }
        });

        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error("Error during searching a tv show:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getSearchHistory = async (req, res) => {
    try {
        const history = req.user.searchHistory;
        res.status(200).json({ success: true, content: history });

    } catch {
        console.error("Error during fetching searchHistory:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const removeItemFromSearchHistory = async (req, res) => {
    let { id } = req.params;

    id = parseInt(id);

    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id },
            },
        });

        res.status(200).json({ success: true, message: "Item removed from search history" });
    } catch (error) {
        console.log("Error in removeItemFromSearchHistory controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
