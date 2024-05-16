import React from "react";
import {Header} from "../components/shared/Header";
import {Footer} from "../components/shared/footer";

export const Pricing = () => {
    const pricingPLans = [
        {
            name: "Basic",
            price: "4.99",
            features: [
                "Calidad 720p",
                "1 Dispositivo",
                "Peliculas Limitadas",
                "Series Limitadas",
                "Descarga no disponible"
            ]
        },
        {
            name: "Standard",
            price: "9.99",
            features: [
                "Calidad 1080p",
                "2 Dispositivos",
                "Alquiler de películas de estreno",
                "Series Ilimitadas",
                "Descarga Disponible"
            ]
        },
        {
            name: "Premium",
            price: "14.99",
            features: [
                "Calidad 4K",
                "4 Dispositivos",
                "Peliculas Ilimitadas",
                "Series Ilimitadas",
                "Descarga Disponible"
            ]
        }
    ];

    return  (
        <div className="main__container">
            <Header/>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Planes de suscripción</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Elige el plan que más se ajuste a tus necesidades.</p>
                </div>
                <div className="grid gap-8 mt-16 sm:grid-cols-3">
                    {pricingPLans.map((plan, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                            <p className="mt-4 text-4xl font-bold text-gray-900">${plan.price}</p>
                            <ul className="mt-6 text-gray-600">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-x-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center justify-center">
                                <button
                                    className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Seleccionar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}