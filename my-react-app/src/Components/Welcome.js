import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
   '@global': {
      ul: {
         margin: 0,
         padding: 0,
         listStyle: 'none',
      },
   },
   card: {
      transition: "0.3s",
      boxShadow: "0 3px 20px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 8px 40px -12.125px rgba(0,0,0,0.3)"
      }
    },
   heroContent: {
      padding: theme.spacing(0, 0, 6),
   },
   cardHeader: {
      backgroundColor: "#900",
      color: "white",
   },
   cardButton: {
      backgroundColor: "#900",
      "&:hover": {
         backgroundColor: "#B00",
       }
   },
}));

const tiers = [
   {
      title: 'Table',
      description: 'An interactive table connecting to a postgreSQL database, SummerDR. You can choose a table in the database. You can also sort it or filter it by column. This function is based on DevExtreme Reactive',
      buttonText: 'start',
      buttonHref: '/table'
   },
   {
      title: 'Terminal',
      description: 'A terminal with a fake file system. Basic linux command is intergrated inside this terminal. You can manipulate this file system with these commands. BUT once you refresh the page, all things will be gone because it is not connected to a database yet!',
      buttonText: 'start',
      buttonHref: '/terminal'
   },
   {
      title: 'More functions',
      description: 'More functions are coming soon!',
   },
];

export default function Pricing() {
   const classes = useStyles();

   return (
      <React.Fragment>
         <CssBaseline />
         {/* Hero unit */}
         <Container maxWidth="md" component="main" className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
               Welcome!
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" component="p">
               Welcome to a simple web application for accessing a postgreSQL database!
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" component="p">
               This web application is based on React.js and Material-UI.
            </Typography>
         </Container>
         {/* End hero unit */}
         <Container maxWidth="md" component="main">
            <Grid container spacing={3}>
               {tiers.map((tier) => (
                  <Grid item key={tier.title} xs={12} sm={12} md={12}>
                     <Card className={classes.card}>
                        <CardHeader
                           title={tier.title}
                           titleTypographyProps={{ align: 'left' }}
                           className={classes.cardHeader}
                        />
                        <Grid container justify="flex-end" alignItems="center" direction="row" spacing={6}>
                           <Grid item xs={12} sm={12} md={10}>
                              <CardContent>
                                 <Typography variant="body2" color="textSecondary" component="p">
                                    {tier.description}
                                 </Typography>
                              </CardContent>
                           </Grid>
                           <Grid item xs={12} sm={12} md={2}>
                              <CardActions style={{justifyContent: 'center'}}>
                                 {tier.title === 'More functions' ?
                                    null :
                                    <Button className={classes.cardButton} variant='contained' color="primary" href={tier.buttonHref}>
                                       {tier.buttonText}
                                    </Button>
                                 }
                              </CardActions>
                           </Grid>
                        </Grid>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         </Container>
      </React.Fragment>
   );
}