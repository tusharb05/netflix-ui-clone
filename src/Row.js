import React, {useState, useEffect} from 'react';
import axios from './axios'; //since it was export default, so we can call it anything
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original"

function Row({title, fetchUrl, isLargeRow}) {
    // useState
    const [movies, setMovies] = useState([]); //in brackets in useState(), we give initial values
    const [trailerURL, setTrailerURL] = useState('')
    useEffect(()=>{
        //if [], run once when row loads then dont run again
        // [movies] mean run everytime movies changes so movies here is a dependency
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
        //when we use any variables from outside of the useEffect hook, we have to specify it in [] cuz they are now the dependencies.
    }, [fetchUrl])
    // console.log(movies)
    const options = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }
    const handleClick = (movie) => {
        if(trailerURL){
            setTrailerURL('');
        } else {
            movieTrailer(movie?.name || "")
            .then(url => {
                //returns full url, we need its id
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerURL(urlParams.get('v'));
            })
            .catch(err => console.log(err))
        }
    }
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(movie => (
                    <img 
                        key={movie.id} 
                        onClick = {()=>handleClick(movie)}
                        src={`${base_url}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                        alt={movie.name} 
                        className={`row_poster ${isLargeRow ? "row_posterLarge": ""}`}
                    />
                ))}
            </div>
            {trailerURL &&<Youtube videoId={trailerURL} opts={options}/>}
        </div>
    )
    // key uniquely identifies each thing. used if many things there
}

export default Row
