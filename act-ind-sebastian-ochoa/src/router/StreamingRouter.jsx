import React from "react";
import {NotFound} from "../components/NotFound";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "../views/Home";

export const StreamingRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}