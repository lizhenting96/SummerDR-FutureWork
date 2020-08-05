import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";

// data
// ===================================================================
const tablenames = [
  { value: 'commits', label: 'commits', },
  { value: 'applications', label: 'applications', },
  { value: 'table3', label: 'table3', },
  { value: 'this is a very long tablename for testing', label: 'this is a very long tablename for testing', },
];

const colRef = {
  'commits': [{ value: 'col1-1', label: 'col1-1' }, { value: 'col1-2', label: 'col1-2' },],
  'applications': [{ value: 'col2-1', label: 'col2-1' }, { value: 'col2-2', label: 'col2-2' },],
  'table3': [{ value: 'col3-1', label: 'col3-1' }, { value: 'col3-2', label: 'col3-2' },],
  'this is a very long tablename for testing': [{ value: 'col4-1', label: 'col4-1' }, { value: 'col4-2', label: 'col4-2' },]
}

const ascdesc = [
  { value: 'ASC', label: 'Ascending' },
  { value: 'DESC', label: 'Descending' },
];

// main
// ===================================================================
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '21ch',
    },
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();

  // form validation and operation after clicking "submit" button
  const handleSubmit = (event) => {
    event.preventDefault();
    // form validation
    if (!tablename.selectVal) {
      setTablename({ hasError: true, errMsg: 'Tablename Requaired!' })
    }
    else{
      if (!numRows.inputVal) {
        setNumRows({ inputVal: '', hasError: true, errMsg: 'Number of rows Required!'  })
      }
      else {
        var r = /^\+?[1-9][0-9]*$/;
        if (!r.test(numRows.inputVal)) {
          setNumRows({ inputVal: numRows.inputVal, hasError: true, errMsg: 'Please input positive integer'  })
        }
      }
      if (searchColName.selectVal && !searchContent.inputVal) {
        setSearchContent({ inputVal: '', hasError: true, errMsg: 'Search content Required!' })
      }
    }
  }
  // ===================================================================

  // tablename state
  const [tablename, setTablename] = React.useState({ selectVal: '', hasError: false, errMsg: '' });
  const [colList, setColList] = React.useState([]);
  const handleTablenameChange = (event) => {
    setTablename({ selectVal: event.target.value });
    if (event.target.value === '') {
      setColList([]);
      setSortColName({ selectVal: '', disabled: true });
      setSearchColName({ selectVal: '', disabled: true });
      setNumRows({ inputVal: '', disabled: true});
      setSortAscDesc({ selectVal: '', disabled: true });
      setSearchContent({ inputVal: '', disabled: true });
    }
    else {
      setColList(colRef[event.target.value]);
      setSortColName({ selectVal: '', disabled: false });
      setSearchColName({ selectVal: '', disabled: false });
      setNumRows({ inputVal: '', disabled: false});
    }
  };
  // -------------------------------------------------------------------------
  // number of rows input state
  const [numRows, setNumRows] = React.useState({ inputVal: '', disabled: true, hasError: false, errMsg: '' });
  const handleNumRowsChange = (event) => {
    setNumRows({ inputVal: event.target.value });
  }
  // -------------------------------------------------------------------------
  // "sort by" part colname state
  const [sortColName, setSortColName] = React.useState({ selectVal: '', disabled: true });
  const handleSortColnameChange = (event) => {
    setSortColName({ selectVal: event.target.value });
    if (event.target.value === '') {
      setSortAscDesc({ selectVal: '', disabled: true })
    }
    else {
      setSortAscDesc({ selectVal: '', disabled: false })
    }
  };
  // -------------------------------------------------------------------------
  // "sort by" part ascending or descending state
  const [sortAscDesc, setSortAscDesc] = React.useState({ selectVal: '', disabled: true });
  const handleSortAscDescChange = (event) => {
    setSortAscDesc({ selectVal: event.target.value });
  };
  // -------------------------------------------------------------------------
  // "search by" part colname state
  const [searchColName, setSearchColName] = React.useState({ selectVal: '', disabled: true });
  const handleSearchColnameChange = (event) => {
    setSearchColName({ selectVal: event.target.value });
    if (event.target.value === '') {
      setSearchContent({ inputVal: '', disabled: true })
    }
    else {
      setSearchContent({ inputVal: '', disabled: false })
    }
  };
  // -------------------------------------------------------------------------
  // "search by" part search content input state
  const [searchContent, setSearchContent] = React.useState({ inputVal: '', disabled: true, hasError: false, errMsg: '' });
  const handleSearchContentChange = (event) => {
    setSearchContent({ inputVal: event.target.value });
  }
  // -------------------------------------------------------------------------
  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container className={classes.root} alignItems='center'>
          {/* Choose table name */}
          <Grid item xs={'auto'}>
            <TextField
              id="select-tablename"
              select
              label="Tablename"
              value={tablename.selectVal ? tablename.selectVal : ''}
              error={tablename.hasError}
              onChange={handleTablenameChange}
              helperText={tablename.hasError ? tablename.errMsg : " "}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {tablenames.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={'auto'}>
            <TextField
              type="number"
              required={true}
              id="num-of-rows"
              label="Number of Rows"
              value={numRows.inputVal}
              disabled={numRows.disabled}
              error={numRows.hasError}
              helperText={numRows.hasError ? numRows.errMsg : " "}
              onChange={handleNumRowsChange}
            />
          </Grid>
          {/* "Sort By" Part */}
          <Grid item xs={'auto'}>
            <TextField
              id="sort-by-col"
              select
              label="Sort By"
              value={sortColName.selectVal ? sortColName.selectVal : ''}
              disabled={sortColName.disabled}
              onChange={handleSortColnameChange}
              helperText=" "
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {colList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={'auto'}>
            <TextField
              id="sort-by-ascdesc"
              select
              label="Order"
              value={sortAscDesc.selectVal ? sortAscDesc.selectVal : ''}
              disabled={sortAscDesc.disabled}
              onChange={handleSortAscDescChange}
              helperText=" "
            >
              {ascdesc.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* Search By Part */}
          <Grid item xs={'auto'}>
            <TextField
              id="search-by-col"
              select
              label="Search By"
              value={searchColName.selectVal ? searchColName.selectVal : ''}
              disabled={searchColName.disabled}
              onChange={handleSearchColnameChange}
              helperText=" "
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {colList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={'auto'}>
            <TextField
              id="search-by-content"
              label="Search Content"
              value={searchContent.inputVal}
              disabled={searchContent.disabled}
              error={searchContent.hasError}
              helperText={searchContent.hasError ? searchContent.errMsg : " "}
              onChange={handleSearchContentChange}
            />
          </Grid>
          <Grid item xs={'auto'}>
            <Button type="submit" variant="contained" color="primary" className={classes.submit}>
              Search
            </Button>
          </Grid>
        </Grid>

    </form>
  );
}