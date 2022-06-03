import React from 'react';
import MovieList from './MovieList'
import SearchBar from "./SearchBar";
import axios from "axios";
import AddMovie from "./AddMovie";
import {
    BrowserRouter,
    Routes,
    Route, useNavigate, Navigate
} from "react-router-dom";
import EditMovie from "./EditMovie";


class App extends React.Component {

    state = {
        movies: [],
        searchQuery: ''
    }

    componentDidMount() {
        this.getMovies();
    }

    async getMovies() {
        const response = await axios.get('http://localhost:3002/movies');
        this.setState({movies: response.data});
    }



    //DELETE MOVIE
    deleteMovie = async (movie) => {
        await axios.delete(`http://localhost:3002/movies/${movie.id}`)
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        )
        this.setState(state => ({
            movies: newMovieList
        }))
    }

    //SEARCH MOVIE
    searchMovie = (event) => {
        this.setState({searchQuery: event.target.value})
    }

    //ADD MOVIE
    addMovie = async (movie) => {
        await axios.post(`http://localhost:3002/movies/`, movie);
        this.setState(state => ({
                movies: state.movies.concat([movie])
            })
        )
        await this.addMovie()

    }

    //EDIT MOVIE
    editMovie = async (id, updatedMovie) => {
        await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie);
        await this.getMovies()
    }

    render() {
        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        ).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0
        })
        return (
            <BrowserRouter>
                <div className='container'>
                    <Routes>
                        <Route path="/" exact element={
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <SearchBar searchMovieProp={this.searchMovie}/>
                                    </div>
                                </div>
                                <MovieList
                                    movies={filteredMovies}
                                    deleteMovieProp={this.deleteMovie}
                                /></React.Fragment>

                        }/>
                        <Route path='/add' element={
                            <AddMovie
                                onAddMovie={(movie) => {
                                    this.addMovie(movie)
                                }
                                }
                            />}/>
                        <Route
                            path="/edit/:id" element={
                            <EditMovie
                                onEditMovie={(id, movie) => {
                                    this.editMovie(id, movie)
                                }}
                            />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;



