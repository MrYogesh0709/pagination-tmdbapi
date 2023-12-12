import { useNavigate } from "react-router-dom";
const MovieList = ({ item }) => {
  const navigate = useNavigate();
  const {
    original_title,
    poster_path,
    release_date,
    title,
    vote_average,
    vote_count,
    id,
  } = item;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const truncatedTitle =
    original_title.length > 10
      ? `${original_title.substring(0, 10)}...`
      : original_title;

  return (
    <div
      className="d-flex flex-center flex-col mt-2 movie-card"
      onClick={() => navigate(`/movie/${id}`, { state: { key: item } })}
    >
      <div className="movie-poster">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="movie-details">
        <h5 className="movie-title">{truncatedTitle}</h5>
        <p className="movie-info hide">
          <small>Release Date: {release_date}</small>
        </p>
        <p className="movie-info hide">
          <small>
            Rating: {vote_average} ({vote_count} votes)
          </small>
        </p>
      </div>
    </div>
  );
};

export default MovieList;
