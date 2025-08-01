/*eslint-disable*/
import NewsArticle from "./NewsArticle";
import Typography from "@mui/material/Typography";
import LoadingArticle from "./LoadingArticle";
export default function NewsFeed({ articles, loading }) {
  if (!loading && !articles.length) {
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        align="center"
        marginTop={4}
      >
        No articles found!
      </Typography>
    );
  }

  return (
    <div>
      {loading && [...Array(5)].map((_, index) => <LoadingArticle key={index} />)}
      {articles.map((article) => (
        <NewsArticle key={JSON.stringify(article)} {...article} />
      ))}
    </div>
  );
}
