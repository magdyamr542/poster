import classes from "*.module.css";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Hidden,
  Typography,
} from "@material-ui/core";
import * as React from "react";

interface PostProps {
  title: string;
  content: string;
  userId: string;
  _id: string;
}

export const Post: React.FC<PostProps> = ({ title, content, userId, _id }) => {
  return (
    <Grid item style={{}}>
      <CardActionArea component="a" href="#">
        <Card style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {userId}
              </Typography>
              <p>{content}</p>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
};
