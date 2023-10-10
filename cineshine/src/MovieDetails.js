import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { useKey } from "./useKey";
import { Section } from "./Section";
import { Key } from "./App";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  const isWatched = watched
    .map((watchedMovie) => watchedMovie.imdbID)
    .includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      if (userRating) countRef.current = countRef.current + 1;
    },
    [userRating]
  );

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function loadMovie() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${Key}&i=${selectedId}`
        );

        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      loadMovie();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "CineShine";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull;</p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} Imdb Rating
              </p>
            </div>
          </header>

          <Section
            isWatched={isWatched}
            setUserRating={setUserRating}
            handleAdd={handleAdd}
            userRating={userRating}
            watchedUserRating={watchedUserRating}
            selectedId={selectedId}
            plot={plot}
            actors={actors}
            director={director}
          />
        </>
      )}
    </div>
  );
}
