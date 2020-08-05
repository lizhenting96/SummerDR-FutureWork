import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from '@material-ui/icons/Search';
import CodeIcon from '@material-ui/icons/Code';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from 'react-router-dom';


export const mainListItems = (
  <div>
    <ListItem button component={ NavLink } exact to="/" activeStyle={{background: "#c4c4c47f"}}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Welcome" />
    </ListItem>
    <ListItem button component={ NavLink } exact to="/table" activeStyle={{background: "#c4c4c47f"}}>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Table" />
    </ListItem>
    <ListItem button component={ NavLink } exact to='/terminal' activeStyle={{background: "#c4c4c47f"}}>
      <ListItemIcon>
        <CodeIcon />
      </ListItemIcon>
      <ListItemText primary="Terminal" />
    </ListItem>
  </div>
);
