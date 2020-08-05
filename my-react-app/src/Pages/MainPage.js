import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems } from "../Components/listItems";
import MainTable from '../Components/MainTable';
import Terminal from '../Components/ReactTerminal';
import Welcome from '../Components/Welcome';
import Paper from '@material-ui/core/Paper';
import { Avatar } from "@material-ui/core";
import iconPic from "../Static/logo.jpg"

// style
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
   root: {
      display: "flex"
   },
   toolbar: {
      paddingRight: 24 // keep right padding when drawer closed
   },
   toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
   },
   appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen
      }),
      backgroundColor: "#900",
   },
   appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen
      })
   },
   menuButton: {
      marginRight: 36
   },
   loginButton: {
      backgroundColor: "#900",
      color: "white",
      fontSize: "1rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      paddingLeft: "15px",
      paddingRight: "15px",
      marginLeft: "5px",
      marginRight: "5px",
      textTransform: "none",
      '&:hover': {
         backgroundColor: "white",
         color: "#900",
      }
   },
   menuButtonHidden: {
      display: "none"
   },
   title: {
      flexGrow: 1,
      paddingLeft: theme.spacing(2.5),
   },
   drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen
      })
   },
   drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
         width: theme.spacing(9)
      }
   },
   appBarSpacer: theme.mixins.toolbar,
   content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto"
   },
   container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
   },
   paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column"
   },
   fixedHeight: {
      height: 120
   }
}));

// small components for MainPage
const HomeHeader = () => (
   <Typography
      component="h1"
      variant="h4"
      color="inherit"
      noWrap
      className={useStyles().title}
   >
      Welcome
   </Typography>
)

const TableHeader = () => (
   <Typography
      component="h1"
      variant="h6"
      color="inherit"
      noWrap
      className={useStyles().title}
   >
      Table
   </Typography>
)

const TerminalHeader = () => (
   <Typography
      component="h1"
      variant="h6"
      color="inherit"
      noWrap
      className={useStyles().title}
   >
      Terminal
   </Typography>
)



export default function MainPage() {
   const classes = useStyles();
   const [open, setOpen] = React.useState(true);
   const handleDrawerOpen = () => {
      setOpen(true);
   };
   const handleDrawerClose = () => {
      setOpen(false);
   };
   return (

      <Router>
         <div className={classes.root}>
            <CssBaseline />
            <AppBar
               position="absolute"
               className={clsx(classes.appBar, open && classes.appBarShift)}
            >
               <Toolbar className={classes.toolbar}>
                  <IconButton
                     edge="start"
                     color="inherit"
                     aria-label="open drawer"
                     onClick={handleDrawerOpen}
                     className={clsx(
                        classes.menuButton,
                        open && classes.menuButtonHidden
                     )}
                  >
                     <MenuIcon />
                  </IconButton>
                  <Avatar src={iconPic} className={classes.avatar} />
                  <Switch>
                     <Route exact path='/' component={HomeHeader} />
                     <Route exact path='/table' component={TableHeader} />
                     <Route exact path='/terminal' component={TerminalHeader} />
                  </Switch>
                  <Button className={classes.loginButton} href='/users/login'>Log In</Button>
                  <Button className={classes.loginButton} href='/users/signup'>Sign up</Button>
               </Toolbar>
            </AppBar>
            <Drawer
               variant="permanent"
               classes={{
                  paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
               }}
               open={open}
            >
               <div className={classes.toolbarIcon}>
                  <IconButton onClick={handleDrawerClose}>
                     <ChevronLeftIcon />
                  </IconButton>
               </div>
               <Divider />
               <List>{mainListItems}</List>
               <Divider />
            </Drawer>
            <main className={classes.content}>
               <div className={classes.appBarSpacer} />
               <Container maxWidth="lg" className={classes.container}>
                  <Grid container spacing={3}>
                     <Grid item xs={12}>
                        <Switch>
                           <Route exact path='/' component={Welcome} />
                           <Paper>
                              <Route exact path='/table' component={MainTable} />
                              <Route exact path='/terminal' component={Terminal} />
                           </Paper>
                        </Switch>
                     </Grid>
                  </Grid>
               </Container>
            </main>
         </div>
      </Router>
   );
}
