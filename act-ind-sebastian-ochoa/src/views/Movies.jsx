import {Header} from "../components/shared/Header";
import {Footer} from "../components/shared/footer";

export const Movies = () => {
    return (
        <div className="main__container">
            <Header/>
            <main className="flex-grow grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Movies</h1>
                </div>
            </main>
            <Footer/>
        </div>
    )
}