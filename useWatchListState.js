import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INITIAL_PROVIDERS } from './types';

export const useWatchListState = () => {
  const [providers, setProviders] = useState(INITIAL_PROVIDERS);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  // Load saved lists once, when the app starts
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedMovies = await AsyncStorage.getItem('watchlist_movies');
      const savedShows = await AsyncStorage.getItem('watchlist_shows');
      if (savedMovies) setMovies(JSON.parse(savedMovies));
      if (savedShows) setTvShows(JSON.parse(savedShows));
    } catch (e) {
      console.error(e);
    }
  };

  // Update state and write it to storage in the same step
  const saveMovies = async (m) => {
    setMovies(m);
    await AsyncStorage.setItem('watchlist_movies', JSON.stringify(m));
  };

  const saveTvShows = async (t) => {
    setTvShows(t);
    await AsyncStorage.setItem('watchlist_shows', JSON.stringify(t));
  };

  // Add a movie to the bucket
  const addMovie = (title, providerId) => {
    const newMovie = {
      id: Date.now().toString(),
      title,
      providerId,
      status: 'toWatch',
    };
    saveMovies([...movies, newMovie]);
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
    saveTvShows([...tvShows, newShow]);
  };

  // Increment TV Show episode
  const incrementEpisode = (showId) => {
    saveTvShows(
      tvShows.map((show) =>
        show.id === showId
          ? { ...show, currentEpisode: show.currentEpisode + 1 }
          : show
      )
    );
  };

  // Increment TV Show season (and reset episode to 1)
  const incrementSeason = (showId) => {
    saveTvShows(
      tvShows.map((show) =>
        show.id === showId
          ? { ...show, currentSeason: show.currentSeason + 1, currentEpisode: 1 }
          : show
      )
    );
  };

  // Toggle movie between To Watch and Watched
  const toggleMovieStatus = (movieId) => {
    saveMovies(
      movies.map((movie) =>
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
