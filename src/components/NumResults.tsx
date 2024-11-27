export default function NumResults({ numMovies }: { numMovies: number }) {
  return (
    <p className="num-results">
      Found <strong>{numMovies}</strong> results
    </p>
  );
}
