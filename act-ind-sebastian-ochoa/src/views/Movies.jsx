import {Header} from "../components/shared/Header";
import {useContext} from "react";
import {MovieContext} from "../context/MovieContext";
import {LinearProgress} from "@mui/material";

export const Movies = () => {
    const { loading, movies } = useContext(MovieContext);
    return (
        <div className="main__container">
            <Header/>
            <main className="grid min-h-full grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Películas</h1>
                </div>
                {loading ? <LinearProgress/> : (movies).map((movie, index) => (
                    <div key={index}>
                        <Movies
                            title={movie.title}
                            overview={movie.overview}
                            poster_path={movie.poster_path}
                            release_date={movie.release_date}
                            vote_average={movie.vote_average}
                        />
                    </div>
                ))}


            </main>
        </div>
    )
}