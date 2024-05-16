import React from "react";
import {NotFound} from "../components/NotFound";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "../views/Home";
import {Movies} from "../views/Movies";
import {Series} from "../views/Series";
import {MyList} from "../views/MyList";
import {Pricing} from "../views/Pricing";

export const StreamingRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/movies/" element={<Movies/>}/>
                <Route path="/series/" element={<Series/>}/>
                <Route path="/my-list/" element={<MyList/>}/>
                <Route path="/pricing/" element={<Pricing/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}