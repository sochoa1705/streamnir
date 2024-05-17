import React from "react";
import {Card, CardContent, CardMedia, Rating, Stack, Typography} from "@mui/material";
import {POSTER_URL} from "../utils/constants";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

export const Serie = ({name, backdrop_path, vote_average, overview, first_air_date}) => {
    const maxLength = 100;
    const trimmedOverview = overview.length > maxLength ? overview.substring(0, maxLength) + '...' : overview;

    return (
        <Card>
            <CardMedia component="img" image={`${POSTER_URL}${backdrop_path}`} title={name}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{name}</Typography>
                <Typography variant="body2" color="text.secondary">{first_air_date}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {trimmedOverview}
                </Typography>
                <Stack spacing={1}>
                    <Rating  defaultValue={vote_average} precision={0.5} readOnly/>
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small">Ver</Button>
                <Button size="small">Agregar a mi lista</Button>
            </CardActions>
        </Card>

    );
}