import React from 'react';
import {Header} from "../components/shared/Header";
import {Footer} from "../components/shared/footer";

export const MyList = () => {
    return (
        <div>
            <Header/>
            <main className="list__main">
                <div className="list__main__container">
                    <h1 className="main__container__head">Mi Lista</h1>
                    <p className="main__container__text">Guarda tus películas y series favoritas.</p>
                </div>
            </main>
            <Footer/>
        </div>
    )
}