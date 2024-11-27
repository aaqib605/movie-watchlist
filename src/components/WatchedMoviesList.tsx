import WatchedMovie from "./WatchedMovie";

interface Movie {
  countRatingDecisions: number;
  imdbID: string | null;
  imdbRating: number;
  poster: string | undefined;
  runtime: number | "" | undefined;
  title: string | undefined;
  userRating: string | number;
  year: string | undefined;
}

interface WatchedMoviesListProps {
  watched: Movie[];
  onDeleteWatched: (id: string | null) => void;
}

export default function WatchedMoviesList({
  watched,
  onDeleteWatched,
}: WatchedMoviesListProps) {
  return (
    <ul className="list">
      {watched.map((movie: Movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
