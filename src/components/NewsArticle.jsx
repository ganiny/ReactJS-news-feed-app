/*eslint-disable*/

import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledCard } from "./StyledCard";
import { styled } from "@mui/material";

const Link = styled("a")(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
}));

export default function NewsArticle({
  title,
  description,
  author,
  publishedAt,
  image,
  url,
}) {
  return (
    <StyledCard>
      <Link href={url} target="_blank">
        <CardActionArea>
          {image && (
            <CardMedia
              component="img"
              height="200"
              image="https://placeholder.co/150"
              alt="Sample article"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <Box p={2}>
        <Typography variant="caption" color="textSecondary" display="block">
          {author}
        </Typography>
        {publishedAt && (
          <Typography variant="caption" color="textSecondary">
            {new Date(publishedAt).toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </StyledCard>
  );
}
