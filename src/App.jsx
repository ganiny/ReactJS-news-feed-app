/*eslint-disable*/
import { Button, Container, styled, Typography } from "@mui/material";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");
  const pageNumber = useRef(1);
  const queryValue = useRef("");
  async function loadData(currentCategory) {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${currentCategory}&q=${
        queryValue.current
      }&page=${pageNumber.current}&max=5&country=us&apikey=${
        process.env.VITE_NEWS_API_KEY
      }`
    );
    const data = await response.json();
    if (data.status !== "ok") {
      throw new Error(data.message);
    }
    return data.articles.map((article) => {
      const { image } = article;
      return {
        ...article,
        image,
      };
    });
  }

  const fetchAndUpdateArticles = (currentCategory) => {
    setLoading(true);
    setError("");
    loadData(currentCategory ?? category)
      .then((newData) => {
        setArticles(newData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debouncedLoadData = debounce(fetchAndUpdateArticles, 500);

  useEffect(() => {
    fetchAndUpdateArticles();
  }, [articles]);

  const handleSearchChange = (newQuery) => {
    queryValue.current = newQuery;
    pageNumber.current = 1;
    debouncedLoadData();
  };

  const handleNextPage = () => {
    pageNumber.current++;
    fetchAndUpdateArticles();
  };

  const handlePreviousPage = () => {
    if (pageNumber.current > 1) {
      pageNumber.current--;
      fetchAndUpdateArticles();
    } else {
      return;
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    pageNumber.current = 1;
    fetchAndUpdateArticles(event.target.value);
  };

  return (
    <Container>
      <NewsHeader
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
      />

      {error ? (
        <Typography align="center" color="error" marginTop={4}>
          {error}
        </Typography>
      ) : (
        <NewsFeed articles={articles} loading={loading} />
      )}
      <Footer>
        <Button
          variant="outlined"
          onClick={handlePreviousPage}
          disabled={loading || pageNumber.current === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextPage}
          disabled={loading || articles.length < 5}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
