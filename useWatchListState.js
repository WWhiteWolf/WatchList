import { useState } from 'react';
import { INITIAL_PROVIDERS } from './types';

export const useWatchListState = () => {
  const [providers, setProviders] = useState(INITIAL_PROVIDERS);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  // Add a movie to the bucket
  const addMovie = (title, providerId) => {
    const newMovie = {
      id: Date.now().toString(),
      title,
      providerId,
      status: 'toWatch',
    };
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  // Add a TV show to track
  const addTvShow = (title, providerId) => {
    const newShow = {
      id: Date.now().toString(),
      title,
      providerId,
      currentSeason: 1,
      currentEpisode: 1,
      status: 'watching',
    };
    setTvShows((prevShows) => [...prevShows, newShow]);
  };

  // Increment TV Show episode
  const incrementEpisode = (showId) => {
    setTvShows((prevShows) =>
      prevShows.map((show) =>
        show.id === showId
          ? { ...show, currentEpisode: show.currentEpisode + 1 }
          : show
      )
    );
  };

  // Increment TV Show season (and reset episode to 1)
  const incrementSeason = (showId) => {
    setTvShows((prevShows) =>
      prevShows.map((show) =>
        show.id === showId
          ? { ...show, currentSeason: show.currentSeason + 1, currentEpisode: 1 }
          : show
      )
    );
  };

  // Toggle movie between To Watch and Watched
  const toggleMovieStatus = (movieId) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, status: movie.status === 'toWatch' ? 'watched' : 'toWatch' }
          : movie
      )
    );
  };

  return {
    providers,
    setProviders,
    movies,
    setMovies,
    tvShows,
    setTvShows,
    addMovie,
    addTvShow,
    incrementEpisode,
    incrementSeason,
    toggleMovieStatus,
  };
};