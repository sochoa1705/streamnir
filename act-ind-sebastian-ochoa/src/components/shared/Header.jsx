import React from "react";
import {useNavigate} from "react-router";

export const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="header__nav">
            <button onClick={() => navigate("/")} className="header__nav__title">Streamnir</button>
            <nav className="header__nav__items">
                <button onClick={() => navigate("/movies")} className="nav__items__btn">Películas</button>
                <button onClick={() => navigate("/series")} className="nav__items__btn">Series</button>
                <button onClick={() => navigate("/my-list")} className="nav__items__btn">Mi Lista</button>
                <button onClick={() => navigate("/pricing")} className="nav__items__btn">Planes</button>
            </nav>
        </header>
    )
}