import { useState } from "react";
import Loader from "./Loader";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";
import { WatchedList } from "./WatchedList";
import { WatchedSummary } from "./WatchedSummary";
import { MovieList } from "./MovieList";
import { Box } from "./Box";
import { Search } from "./Search";
import { Navbar } from "./Navbar";
import { NumResults } from "./NumResults";
import { MovieDetails } from "./MovieDetails";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const Key = "722f29b8";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  const [watched, setWatched] = useLocalStorage([], "watched");

  function handleSelectMovie(id) {
    if (id === selectedId) {
      setSelectedId(null);
      return;
    }
    setSelectedId(id);
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => id !== movie.imdbID));
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatced={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return <div className="error">{message}...</div>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
