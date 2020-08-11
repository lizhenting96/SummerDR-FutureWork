import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
   card: {
      height: '100%',
   },
   cardMedia: {
      height: 160,
    },
});

export default function NavCard(props) {
   const classes = useStyles();
   const { pic } = props

   return (

      <Card className={classes.card}>
         <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
               <Hidden smDown>
                  <CardMedia className={classes.cardMedia} image={pic.image} title={pic.imageTitle} />
               </Hidden>
            </Grid>
            <Grid item xs={12}>
               <List>
                  <ListItem button component="a" to="#" key='Twitter'>
                     <ListItemIcon>
                        <TwitterIcon />
                     </ListItemIcon>
                     <ListItemText primary="Twitter" />
                  </ListItem>
                  <ListItem button component="a" to="#" key='GitHub'>
                     <ListItemIcon>
                        <GitHubIcon />
                     </ListItemIcon>
                     <ListItemText primary="GitHub" />
                  </ListItem>
                  <ListItem button component="a" to="#" key='Facebook'>
                     <ListItemIcon>
                        <FacebookIcon />
                     </ListItemIcon>
                     <ListItemText primary="Facebook" />
                  </ListItem>
               </List>
            </Grid>
         </Grid>
      </Card>
   );
}

NavCard.propTypes = {
   pic: PropTypes.object,
};