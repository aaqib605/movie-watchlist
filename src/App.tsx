import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import StarRating from "./components/StarRating";
import { useKey } from "./hooks/useKey";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useMovies } from "./hooks/useMovies";

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

interface ErrorMessage {
  message: string;
}

interface NavbarProps {
  children: ReactNode;
}

interface SearchProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

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

interface MoviePropsComponent {
  movie: MovieProps;
  onSelectMovie: (id: string | null) => void;
}

interface MovieDetailsProps {
  selectedId: string | null;
  onCloseMovie: () => void;
  onAddWatched: (movie: Movie) => void;
  watched: Movie[];
}

interface MovieApiResonseProps {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string | number;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
}

interface WatchedMoviesListProps {
  watched: Movie[];
  onDeleteWatched: (id: string | null) => void;
}

interface WatchedMovieProps {
  movie: Movie;
  onDeleteWatched: (id: string | null) => void;
}

const average = (arr: number[]) =>
  arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);

const KEY = "f84fc31d";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id: string | null) {
    setSelectedId((selectedId: string | null) =>
      id === selectedId ? null : id
    );
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: Movie) {
    console.log(watched);
    setWatched((watched: Movie[]) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string | null) {
    console.log(id);
    setWatched((watched: Movie[]) =>
      watched.filter((movie) => movie.imdbID !== id)
    );
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults numMovies={movies?.length} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
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
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }: ErrorMessage) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

function NavBar({ children }: NavbarProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }: SearchProps) {
  const inputEl = useRef<HTMLInputElement | null>(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;

    inputEl.current?.focus();

    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ numMovies }: { numMovies: number }) {
  return (
    <p className="num-results">
      Found <strong>{numMovies}</strong> results
    </p>
  );
}

function Main({ children }: { children: ReactNode }) {
  return <main className="main">{children}</main>;
}

function Box({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }: MoviePropsComponent) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieApiResonseProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  const isWatched =
    selectedId && watched.map((movie) => movie.imdbID).includes(selectedId);

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
  } = movie || {};

  // const isTop = imdbRating > 8;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId && selectedId, // this resolves the type error
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime && Number(String(runtime).split(" ")[0]),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();

        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
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
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {Number(userRating) > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }: { watched: Movie[] }) {
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
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({
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

function WatchedMovie({ movie, onDeleteWatched }: WatchedMovieProps) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
