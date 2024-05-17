import {Header} from "../components/shared/Header";
import {useContext} from "react";
import {MovieContext} from "../context/MovieContext";
import {LinearProgress} from "@mui/material";
import {Movie} from "../components/Movie";
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export const Movies = () => {
    const { loading, movies } = useContext(MovieContext);
    return (
        <div className="main__container">
            <Header/>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Películas</h1>
                </div>
                <div className="pt-6">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={movies}
                        getOptionLabel={(option) => option.title}
                        sx={{ width: 600 }}
                        renderInput={(params) => <TextField {...params} label="Buscar" />}
                    />
                </div>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="pt-6">
                    {loading ?  (<LinearProgress/>) : ((movies).slice(0,12).map((movie) => (
                        <Grid item key={movie.id} xs={6}>
                            <Movie
                                id={movie.id}
                                title={movie.title}
                                overview={movie.overview}
                                backdrop_path={movie.backdrop_path}
                                release_date={movie.release_date}
                                vote_average={movie.vote_average}
                            />
                        </Grid>)
                    ))}
                </Grid>


            </main>
        </div>
    )
}