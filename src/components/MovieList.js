import React from 'react';
import {Link} from "react-router-dom";

const MovieList = (props) => {

const truncatOverview=(string,maxLenght)=>{
    if(!string) return null;
    if (string.length<=maxLenght) return string;
    return `${string.substring(0,maxLenght)} ...`
}

    return (
        <div className="row">
            {
                props.movies.map((movie,i) => (

                    <div className="col-sm-3" key={i}>
                        <div className="card mb-5 shadow-sm">
                            <img
                                src={movie.imageURL}
                                className='card-img-top ' alt="Sample Movie"/>
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text">{truncatOverview(movie.overview,100)}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button type='button' onClick={()=>props.deleteMovieProp(movie)} className='btn btn-md btn-outline-danger rounded-pill'>Delete</button>

                                    <Link type="button"
                                    className="btn btn-md rounded-pill btn-outline-primary"
                                    to={`edit/${movie.id}`}
                                    >Edit
                                    </Link>
                                    <h2><span className='badge rounded-pill  bg-success'>{movie.rating}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>))
            }
        </div>
    )

}

export default MovieList;