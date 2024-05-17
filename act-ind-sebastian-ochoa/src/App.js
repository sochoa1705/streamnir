import './App.css';
import {StreamingRouter} from "./router/StreamingRouter";
import {Footer} from "./components/shared/footer";
import {MovieContext} from "./context/MovieContext";
import {SerieContext} from "./context/SerieContext";
import {useMovies} from "./hooks/useMovies";
import {useSeries} from "./hooks/useSeries";

function App() {
    const {movies, loading} = useMovies();
    const series = useSeries();

    return (
        <MovieContext.Provider value={{movies, loading}}>
            <SerieContext.Provider value={{series}}>
                <StreamingRouter></StreamingRouter>
                <Footer/>
            </SerieContext.Provider>
        </MovieContext.Provider>
    );
}

export default App;
