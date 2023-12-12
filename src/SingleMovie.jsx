import { useLocation } from "react-router-dom";
import github from "./assets/github.svg";
const MovieCard = () => {
  const location = useLocation();
  const { key } = location.state || {};
  const {
    backdrop_path,
    overview,
    poster_path,
    release_date,
    title,
    vote_average,
  } = key;
  const imageStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop_path})`,
  };

  return (
    <div className="d-flex flex-col single-movie-card">
      <div className="single-movie-card-image" style={imageStyle}>
        <img
          className="single-movie-poster"
          src={`https://image.tmdb.org/t/p/w185${poster_path}`}
          alt={title}
        />
      </div>
      <div className="d-flex flex-center flex-col items-center m-center">
        <h3 className="movie-title">{title}</h3>
        <p className="single-movie-release-date">
          {new Date(release_date).getFullYear()}
        </p>
        <p className="single-movie-overview">{overview}</p>
      </div>
      <div className="single-movie-card-footer">
        <span className="single-movie-vote-average">{vote_average}</span>
      </div>
      <a
        href="https://github.com/MrYogesh0709/pagination-tmdbapi"
        target="_blank"
        rel="noreferrer"
      >
        <img src={github} alt="github" className="github" />
      </a>
    </div>
  );
};

export default MovieCard;
