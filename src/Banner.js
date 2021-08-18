import React, {useState, useEffect} from 'react';
import requests from './requests';
import axios from './axios';
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            console.log()
            setMovie(
                request.data.results[Math.floor(Math.random()*request.data.results.length-1)]
            );
            return request;
        }
        fetchData();
    }, [])
    console.log(movie)
    let styles = {       
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center"
    }

    function truncate(str, n){
        return str?.length>n ? str.substring(0, n-1) + "..." : str;
    }

    return (
        <header className="banner" style={styles}>   

            <div className="banner_content">
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
                {/* ? handles error */}
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <h2 className="banner_description">
                    {/* {movie?.overview} */}
                    {truncate(movie?.overview, 150)}
                </h2>
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    )
}

export default Banner
