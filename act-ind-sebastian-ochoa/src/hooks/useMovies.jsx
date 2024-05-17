import {useEffect, useState} from "react";
import {API_ENDPOINT, API_KEY, API_URL} from "../utils/constants";

export const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchMovies(pageNumber) {
        const response = await fetch(`${API_URL}${API_ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            },
            params: {
                language: 'es-Es',
                page: pageNumber,
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            return data.results;
        }

}

const getMovies = async (pageNumber = 1) => {
    try {
        const response = await fetchMovies(pageNumber);
        setMovies(response);
        setLoading(false);
    } catch (error) {
        console.error('Error al obtener peliculas:', error);
    }
}

useEffect(() => {
    getMovies();
}, [`${API_URL}${API_ENDPOINT}`]);

return {movies, loading};
}