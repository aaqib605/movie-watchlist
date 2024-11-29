import Movie from "./Movie";

interface MovieProps {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface MovieListProps {
  movies: MovieProps[];
  onSelectMovie: (id: string | null) => void;
}

export default function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <>
      <ul className="list list-movies">
        {movies.length > 0 ? (
          movies?.map((movie) => (
            <Movie
              movie={movie}
              key={movie.imdbID}
              onSelectMovie={onSelectMovie}
            />
          ))
        ) : (
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "1.5rem",
            }}
            className=""
          >
            Search movies to see results.
          </span>
        )}
      </ul>
    </>
  );
}
