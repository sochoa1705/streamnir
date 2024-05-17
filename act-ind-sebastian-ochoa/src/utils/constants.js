export const pricingPLans = [
    {
        name: "Basic",
        price: "4.99",
        features: [
            "Calidad 720p",
            "1 Dispositivo",
            "Peliculas Limitadas",
            "Series Limitadas",
            "Descarga no disponible"
        ]
    },
    {
        name: "Standard",
        price: "9.99",
        features: [
            "Calidad 1080p",
            "2 Dispositivos",
            "Alquiler de películas de estreno",
            "Series Ilimitadas",
            "Descarga Disponible"
        ]
    },
    {
        name: "Premium",
        price: "14.99",
        features: [
            "Calidad 4K",
            "4 Dispositivos",
            "Peliculas Ilimitadas",
            "Series Ilimitadas",
            "Descarga Disponible"
        ]
    }
];
export const API_URL = 'https://api.themoviedb.org/3' ;
export const API_ENDPOINT = '/movie/now_playing';
export const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjA2YmI5YmI4OGMxODViYThmYWZhY2ZjZjc5MzMyMSIsInN1YiI6IjY2M2ZhZjY3MzRjN2E2ZjAzOTU5MjAyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y7MHI4_rceQAKl2h3b0yRoCJTX79PucCOC0I5B49S0g';
export const POSTER_URL = 'https://image.tmdb.org/t/p/w200';
export const API_SERIES = '/tv/popular';