import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { Avatar } from "@material-ui/core";
import iconPic from "../Static/logo.jpg"
import { NavLink, Link } from "react-router-dom";

const useSytles = makeStyles(theme => ({
   grow: {
      flexGrow: 1,
   },
   appBar: {
      backgroundColor: "#900",
      position: 'absolute',
   },
   toolbar: {
      paddingRight: 24,
      paddingLeft: 24
   },
   avatar: {
      marginRight: theme.spacing(4),
      marginLeft: theme.spacing(4),
   },
   loginButton: {
      backgroundColor: "white",
      color: "#900",
      fontSize: "1rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      padding: '3px 15px',
      marginLeft: "5px",
      marginRight: "5px",
      textTransform: "none",
      '&:hover': {
         backgroundColor: "#E2E2E2",
         color: "#900",
      }
   },
   navButton: {
      backgroundColor: "#900",
      color: "white",
      fontSize: "1rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      paddingLeft: "15px",
      paddingRight: "15px",
      marginLeft: "2px",
      marginRight: "2px",
      textTransform: "none",
      '&:hover': {
         backgroundColor: "white",
         color: "#900",
      },
   },
   search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
         backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('md')]: {
         width: 'auto',
      },
   },
   searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   inputRoot: {
      color: 'inherit',
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
         width: '20ch',
      },
   },
   sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
         display: 'flex',
      },
   },
   sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
         display: 'none',
      },
   },
}));

export default function HomePageNavBar() {
   const classes = useSytles();

   const [userMoreAnchorEl, setUserMoreAnchorEl] = React.useState(null);
   const [navMoreAnchorEl, setNavMoreAnchorEl] = React.useState(null);

   const isUserMenuOpen = Boolean(userMoreAnchorEl);
   const isNavMenuOpen = Boolean(navMoreAnchorEl)

   const handleUserMenuClose = () => {
      setUserMoreAnchorEl(null);
   };
   const handleUserMenuOpen = (event) => {
      setUserMoreAnchorEl(event.currentTarget);
   };

   const handleNavMenuClose = () => {
      setNavMoreAnchorEl(null);
   };
   const handleNavMenuOpen = (event) => {
      setNavMoreAnchorEl(event.currentTarget);
   };

   const userMenuId = 'user-menu-mobile';
   const renderUserMenu = (
      <Menu
         anchorEl={userMoreAnchorEl}
         getContentAnchorEl={null}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
         id={userMenuId}
         keepMounted
         transformOrigin={{ vertical: 'top', horizontal: 'center' }}
         open={isUserMenuOpen}
         onClose={handleUserMenuClose}
      >
         <MenuItem component={NavLink} to='/users/login'>
            Login
         </MenuItem>
         <MenuItem component={NavLink} to='/users/signup'>
            Sign up
         </MenuItem>
      </Menu>
   );

   const navMenuId = 'nav-menu-mobile';
   const renderNavMenu = (
      <Menu
         anchorEl={navMoreAnchorEl}
         getContentAnchorEl={null}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
         id={navMenuId}
         keepMounted
         transformOrigin={{ vertical: 'top', horizontal: 'center' }}
         open={isNavMenuOpen}
         onClose={handleNavMenuClose}
      >
         <MenuItem component={NavLink} to='#'>
            Code
         </MenuItem>
         <MenuItem component={NavLink} to='#'>
            Developers
         </MenuItem>
         <MenuItem component={NavLink} to='#'>
            Contact
         </MenuItem>
      </Menu>
   );
   return (
      <AppBar className={classes.appBar}>
         <Container maxWidth='lg'>
            <Toolbar className={classes.toolbar}>
               <Link to='/'>
                  <Avatar src={iconPic} className={classes.avatar} />
               </Link>

               {/* navButtons for large screen */}
               <div className={classes.sectionDesktop}>
                  <Button className={classes.navButton} href='#'>Code</Button>
                  <Button className={classes.navButton} href='#'>Developers</Button>
                  <Button className={classes.navButton} href='#'>Contact</Button>
               </div>
               {/* navButtons for small screen */}
               <div className={classes.sectionMobile}>
                  <IconButton
                     edge="start"
                     className={classes.menuButton}
                     color="inherit"
                     aria-label="open drawer"
                     onClick={handleNavMenuOpen}
                  >
                     <MenuIcon />
                  </IconButton>
               </div>

               <div className={classes.grow}></div>

               <InputBase
                  placeholder="Search…"
                  classes={{
                     root: classes.inputRoot,
                     input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  endAdornment={
                     <IconButton color='inherit' size='small'>
                        <SearchIcon />
                     </IconButton>
                  }
                  className={classes.search}
               />
               {/* log-in and sign-up buttons for large screen */}
               <div className={classes.sectionDesktop}>
                  <Button className={classes.loginButton} href='/users/login'>Log In</Button>
                  <Button className={classes.loginButton} href='/users/signup'>Sign up</Button>
               </div>
               {/* log-in and sign-up buttons for small screen */}
               <div className={classes.sectionMobile}>
                  <IconButton
                     edge="start"
                     className={classes.menuButton}
                     color="inherit"
                     aria-label="login button"
                     onClick={handleUserMenuOpen}
                  >
                     <AccountCircle />
                  </IconButton>
               </div>

            </Toolbar>
         </Container>
         {renderUserMenu}
         {renderNavMenu}
      </AppBar>

   )
}