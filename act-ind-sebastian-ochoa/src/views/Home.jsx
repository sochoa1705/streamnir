import {Header} from "../components/shared/Header";

export const Home = () => {
    return (
        <div>
            <Header/>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Welcome to
                        Streaming</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Watch your favorite movies and TV shows on the
                        go.</p>
                </div>
            </main>
        </div>
    )
}