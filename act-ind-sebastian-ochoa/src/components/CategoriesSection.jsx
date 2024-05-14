import {useNavigate} from "react-router";

export const CategoriesSection = () => {
    const navigate = useNavigate();
    const content = [
        {
            name: 'Tendencias',
            role: 'Nuevo contenido',
            imageUrl:
                'https://cdn.iconscout.com/icon/premium/png-512-thumb/trend-2967869-2464483.png?f=webp&w=200',
        },
        {
            name: 'Acción',
            role: 'Promoción del 20% en alquiler',
            imageUrl:
                'https://cdn.iconscout.com/icon/premium/png-512-thumb/action-1649706-1399432.png?f=webp&w=256',
        },
        {
            name: 'Series',
            role: 'Estrenos de la semana',
            imageUrl:
                'https://cdn.iconscout.com/icon/premium/png-512-thumb/tv-32-88214.png?f=webp&w=256',
        },
        {
            name: 'Comedia',
            role: 'Risas aseguradas',
            imageUrl:
                'https://cdn.iconscout.com/icon/premium/png-512-thumb/comedy-2-248104.png?f=webp&w=256',
        }

]
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Conoce nuestras categorías</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Compra o renta tus películas y series favoritas en Streamnir.
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {content.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt=""/>
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <button onClick={() => navigate("/movies/")} className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}