import {Header} from "../components/shared/Header";
import '../styles/styles.css';
import {Footer} from "../components/shared/footer";
import {CategoriesSection} from "../components/CategoriesSection";

export const Home = () => {
    return (
        <div className="main__container">
            <Header/>
            <main className="home__main">
                <div className="home__main__info">
                    <h1 className="home__main__title">Bienvenido a
                        Streamnir</h1>
                    <p className="home__main__text">Mira tus series y películas cuando quieras, donde sea.</p>
                </div>
                <CategoriesSection/>
            </main>
            <Footer/>
        </div>
    )
}