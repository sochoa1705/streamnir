import React from "react";
import {Card, CardContent, CardMedia, Rating, Stack, Typography} from "@mui/material";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {POSTER_URL} from "../utils/constants";

export const Movie = ({id, title, backdrop_path, vote_average, overview, release_date}) => {
    const maxLength = 100;
    const trimmedOverview = overview.length > maxLength ? overview.substring(0, maxLength) + '...' : overview;

    return (
        <Card color={"yellow"}>
            <CardMedia component="img" image={`${POSTER_URL}${backdrop_path}`} title={title}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{title}</Typography>
                <Typography variant="body2" color="text.secondary">{release_date}</Typography>
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