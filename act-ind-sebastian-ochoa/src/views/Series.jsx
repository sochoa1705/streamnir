import React from "react";
import {Header} from "../components/shared/Header";

export const Series = () => {
    return (
        <div className="main__container">
            <Header/>
            <main className="grid min-h-full grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Series</h1>
                </div>
            </main>
        </div>
    )
}