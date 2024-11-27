interface MovieProps {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface MoviePropsComponent {
  movie: MovieProps;
  onSelectMovie: (id: string | null) => void;
}

export default function Movie({ movie, onSelectMovie }: MoviePropsComponent) {
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
