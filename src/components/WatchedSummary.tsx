import { average } from "../utils/utilityFunctions";

export interface Movie {
  countRatingDecisions: number;
  imdbID: string | null;
  imdbRating: number;
  poster: string | undefined;
  runtime: number | "" | undefined;
  title: string | undefined;
  userRating: string | number;
  year: string | undefined;
}

export default function WatchedSummary({ watched }: { watched: Movie[] }) {
  const avgImdbRating = average(
    watched.map((movie) => Number(movie.imdbRating))
  );
  const avgUserRating = average(
    watched.map((movie) => Number(movie.userRating))
  );
  const avgRuntime = average(watched.map((movie) => Number(movie.runtime)));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
