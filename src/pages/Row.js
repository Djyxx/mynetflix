import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import "../styles/Row.css";
import Youtube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const playerRef = useRef(null);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const fetchTrailerUrl = async (movieId) => {
    const apiKey = "dfff442bb46913bf44f223ad549ae39b";
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
    );
    const videos = response.data.results;
    const trailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    if (trailer) {
      return trailer.key;
    } else {
      return null;
    }
  };

  const handleToggle = async (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
      setSelectedTrailer(null);
      if (playerRef.current) {
        playerRef.current.internalPlayer.pauseVideo(); // Mettre en pause la vidéo
      }
    } else {
      try {
        setSelectedMovie(movie);
        setSelectedTrailer(null);

        // Fermer les détails et les trailers des autres catégories
        const categories = document.querySelectorAll(".row");
        categories.forEach((category) => {
          const details = category.querySelector(".row__details");
          const trailer = category.querySelector(".youtube-player");
          if (details && trailer) {
            details.style.display = "none";
            trailer.style.display = "none";
            if (category !== selectedMovie) {
              // Mettre en pause le lecteur vidéo des autres catégories
              const player = trailer.querySelector("iframe");
              if (player) {
                player.contentWindow.postMessage(
                  '{"event":"command","func":"pauseVideo","args":""}',
                  "*"
                );
              }
            }
          }
        });

        const trailerKey = await fetchTrailerUrl(movie.id);
        setSelectedTrailer(trailerKey || null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleToggle(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>

      {selectedMovie && (
        <div className="row__details">
          <>
            <h3 className="row__detailsTitle">{selectedMovie.title}</h3>
            <p className="row__detailsOverview">{selectedMovie.overview}</p>
          </>
        </div>
      )}

      {selectedTrailer && (
        <div className="youtube-player">
          <>
            <h3 className="row__detailsTitle">{selectedMovie.title}</h3>
            <Youtube
              videoId={selectedTrailer}
              opts={opts}
              ref={playerRef} // Référence au lecteur vidéo
            />
          </>
        </div>
      )}
    </div>
  );
}

export default Row;
