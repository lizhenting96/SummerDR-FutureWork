import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from '@material-ui/core/Grid';
import NavBar from "../Components/HomePageNavBar";
import MainHeader from "../Components/HomePageMainHeader";
import FeatureCard from "../Components/HomePageFeatureCard";
import NavCard from "../Components/HomePageNavCard";
import Footer from "../Components/HomePageFooter";
import { Container } from "@material-ui/core";

const useSytles = makeStyles(theme => ({
   root: {
      display: "flex"
   },
   appBarSpacer: theme.mixins.toolbar,
}));

const mainHeaderContent = {
   title: 'A simple home page',
   description:
      "This is a simple home page. Write some description here. Background images are images from https://source.unsplash.com",
   image: 'https://source.unsplash.com/WLUHO9A_xik',
   imgText: 'main image description',
};

const featureCardContents = [
   {
      title: 'News Title 1',
      date: 'Nov 1',
      description:
         '',
      image: 'https://source.unsplash.com/EJ4qfFp1g8Q',
      imageText: 'Image Text',
   },
   {
      title: 'News Title 2',
      date: 'Nov 2',
      description:
         'This is a wider card with where you can put some news and link in it. This is a wider card with where you can put some news and link in it. This is a wider card with where you can put some news and link in it.This is a wider card with where you can put some news and link in it.This is a wider card with where you can put some news and link in it.',
      image: 'https://source.unsplash.com/jFCViYFYcus',
      imageText: 'Image Text',
   },
   {
      title: 'News Title 3',
      date: 'Nov 3',
      description:
         'This is a wider card with where you can put some news and link in it.',
      image: 'https://source.unsplash.com/hFzIoD0F_i8',
      imageText: 'Image Text',
   },
];

const navCardPic = {
   title: 'Nav Card',
   image: 'https://source.unsplash.com/vUNQaTtZeOo',
}

export default function HomePage() {
   const classes = useSytles();
   return (
      <React.Fragment>
         <div className={classes.root}>
            <CssBaseline />
            <Container maxWidth='lg'>
               <NavBar />
               <div className={classes.appBarSpacer} />
               <main>
                  <MainHeader post={mainHeaderContent} />
                  <Grid container spacing={4}>
                     {featureCardContents.map((post) => (
                        <Grid key={post.title} item xs={12} md={3}>
                           <FeatureCard  post={post} />
                        </Grid>
                     ))}
                     <Grid item xs={12} md={3}>
                        <NavCard key='NavCard' pic={navCardPic}/>
                     </Grid>
                  </Grid>
               </main>
            </Container>

         </div>
         <Footer />
      </React.Fragment>
   )
}