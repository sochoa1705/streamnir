import React from "react";
import {Header} from "../components/shared/Header";
import {useSeries} from "../hooks/useSeries";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import {LinearProgress} from "@mui/material";
import {Serie} from "../components/Serie";

export const Series = () => {
    const series = useSeries();
    return (
        <div className="main__container">
            <Header/>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Series</h1>
                </div>
                <div className="pt-6 md:flex">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={series}
                        getOptionLabel={(option) => option.name}
                        sx={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Buscar"/>}
                    />
                </div>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} className="pt-6 md:flex">
                    {series.length > 0 ? series.slice(0, 12).map((serie) => (
                        <Grid item key={serie.id} xs={6}>
                            <Serie
                                name={serie.name}
                                overview={serie.overview}
                                backdrop_path={serie.backdrop_path}
                                first_air_date={serie.first_air_date}
                                vote_average={serie.vote_average}
                            />
                        </Grid>
                    )) : <LinearProgress/>
                    }
                </Grid>


            </main>
        </div>
    )
}