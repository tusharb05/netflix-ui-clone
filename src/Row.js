import React, {useState, useEffect} from 'react';
import axios from './axios'; 
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original"

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]); 
    const [trailerURL, setTrailerURL] = useState('')
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])
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
