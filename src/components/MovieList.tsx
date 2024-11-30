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
          <span className="search-movie">Search movies to see results.</span>
        )}
      </ul>
    </>
  );
}
