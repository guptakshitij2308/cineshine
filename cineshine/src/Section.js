import StarRating from "./StarRating";

export function Section({
  isWatched,
  setUserRating,
  handleAdd,
  userRating,
  watchedUserRating,
  selectedId,
  plot,
  actors,
  director,
}) {
  return (
    <section>
      <div className="rating">
        {!isWatched ? (
          <>
            <StarRating
              maxRating={10}
              size={24}
              onSetRating={setUserRating}
              key={selectedId}
            />
            {userRating && (
              <button className="btn-add" onClick={handleAdd}>
                + Add to list
              </button>
            )}
          </>
        ) : (
          <p>
            You rated this movie {watchedUserRating}
            <span>⭐</span>
          </p>
        )}
      </div>
      <p>
        <em>{plot}</em>
      </p>
      <p>Starring {actors}</p>
      <p>Directed by {director}</p>
    </section>
  );
}
