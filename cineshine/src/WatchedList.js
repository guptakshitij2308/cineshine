import { WatchedMovie } from "./WatchedMovie";

export function WatchedList({ watched, onDeleteWatced }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatced={onDeleteWatced}
        />
      ))}
    </ul>
  );
}
