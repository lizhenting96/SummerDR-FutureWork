import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  card: {
    height: '100%',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    height: 160,
  },
  typography: {
    overflow: "hidden",
    position: "relative",
    lineHeight: "1.2em",
    maxHeight: "9.6em",
    textAlign: "justify",
    marginRight: "-0.5em",
    paddingRight: "1em",
    marginBottom: "0.5em",
    "&&:before": {
      content: '"..."',
      position: "absolute",
      right: 0,
      bottom: 0
    },
    "&&:after": {
      content: '""',
      position: "absolute",
      right: 0,
      width: "1em",
      height: "1em",
      marginTop: "0.2em",
      background: "white"
    }
  }
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <CardActionArea component="a" href="#" style={{ height: "100%" }}>
      <Card className={classes.card}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Hidden smDown>
              <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
            </Hidden>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {post.date}
                </Typography>
                <Box minHeight="11em">
                  <Typography component="p" className={classes.typography}>
                    {post.description}
                  </Typography>
                </Box>


                <Typography variant="subtitle1" color="primary">
                  Continue reading...
              </Typography>
              </CardContent>
            </div>
          </Grid>
        </Grid>
      </Card>
    </CardActionArea>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};