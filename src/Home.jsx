import MovieList from "./MovieList";
import { useLoaderData, Form } from "react-router-dom";
import github from "./assets/github.svg";
import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_API_KEY;

const searchMovieQuery = (page) => {
  return {
    queryKey: ["page", page || 1],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
      );
      const result = await response.json();
      return { result };
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const currentPage = url.searchParams.get("page") || 1;
    await queryClient.ensureQueryData(searchMovieQuery(currentPage));
    return { currentPage };
  };

const Home = () => {
  const { currentPage } = useLoaderData();
  const {
    data: { result },
  } = useQuery(searchMovieQuery(currentPage));
  const { results, total_pages } = result;
  const maxButtonsToShow = 10;
  const pageCount = total_pages > 500 ? 500 : 500;
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxButtonsToShow / 2),
      pageCount - maxButtonsToShow + 1
    )
  );
  const endPage = Math.min(startPage + maxButtonsToShow - 1, pageCount);
  const pageButtons = [...Array(endPage - startPage + 1).keys()].map(
    (index) => startPage + index
  );
  return (
    <div>
      <h1 className="mt-2">TMDB API</h1>
      <div className="line"></div>
      <section className="d-flex f-wrapper flex-center gap-1">
        {results.length > 0 &&
          results?.map((item) => <MovieList item={item} key={item.id} />)}
      </section>
      {results !== null && (
        <Form className="d-flex flex-center f-wrapper">
          {currentPage > 1 && (
            <>
              <button
                disabled={currentPage === 1}
                type="submit"
                name="page"
                value={1}
              >
                First
              </button>

              <button
                disabled={currentPage === 1}
                type="submit"
                name="page"
                value={currentPage - 1}
              >
                Prev
              </button>
            </>
          )}
          {pageButtons.map((page) => (
            <button
              key={page}
              disabled={currentPage === page}
              name="page"
              value={page}
            >
              {page}
            </button>
          ))}
          {currentPage < pageCount && (
            <>
              <button
                disabled={currentPage === pageCount}
                name="page"
                value={currentPage + 1}
              >
                Next
              </button>
              <button
                disabled={currentPage === pageCount}
                value={pageCount}
                name="page"
              >
                Last
              </button>
            </>
          )}
        </Form>
      )}
      <a
        href="https://github.com/MrYogesh0709/todo"
        target="_blank"
        rel="noreferrer"
      >
        <img src={github} alt="github" className="github" />
      </a>
    </div>
  );
};

export default Home;
