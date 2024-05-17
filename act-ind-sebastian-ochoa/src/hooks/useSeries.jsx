import {useEffect,  useState } from "react";
import {API_KEY, API_SERIES, API_URL} from "../utils/constants";

export const useSeries = () => {
    const [series, setSeries] = useState([]);

    async function fetchSeries(pageNumber) {
        const response = await fetch(`${API_URL}${API_SERIES}`, {
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

    const getSeries = async (pageNumber = 1) => {
        try {
            const response = await fetchSeries(pageNumber);
            setSeries(response);
        } catch (error) {
            console.error('Error al obtener series:', error);
        }
    }

    useEffect(() => {
        getSeries();
    }, []);

    return series;
}