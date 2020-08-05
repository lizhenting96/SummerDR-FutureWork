import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import iconPic from "../Static/logo.jpg"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="/">
        Return to Home Page
      </Link>{' '}
    </Typography>
  );
}

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#900',
    },
    '& label': {
      color: '#900',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#900',
      },
      '&:hover fieldset': {
        borderColor: '#900',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#900',
      },
    },
    '& p.MuiFormHelperText-root': {
      color: '#900',
      marginTop: 0,
      marginBottom: '5px',
      marginLeft: '14px',
      marginRight: '14px',
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    backgroundColor: "#900",
    "&:hover": {
      backgroundColor: "#B00",
    }
  },
  link: {
    color: "#900"
  },
}));

export default function SignUp() {
  const classes = useStyles();

  // states
  const [fName, setFName] = useState({inputVal: '', hasErr: false, errMsg: ''})
  const [lName, setLName] = useState({inputVal: '', hasErr: false, errMsg: ''})
  const [email, setEmail] = useState({inputVal: '', hasErr: false, errMsg: ''})
  const [password, setPassword] = useState({inputVal: '', hasErr: false, errMsg: ''})
  const [repassword, setRePassword] = useState({inputVal: '', hasErr: false, errMsg: ''})

  // handle states changes & form validation
  const handleFNameChange = (e) => {
    const {value} = e.target;
    setFName((prevState) => ({
      ...prevState,
      inputVal: value,
    }))
    if (value === '') {
      setFName((prevState) => ({
        ...prevState,
        hasErr: true,
        errMsg: 'Required'
      }))
    }
  }
  const handleLNameChange = (e) => {
    const {value} = e.target;
    setLName((prevState) => ({
      ...prevState,
      inputVal: value,
    }))
    if (value === '') {
      setLName((prevState) => ({
        ...prevState,
        hasErr: true,
        errMsg: 'Required'
      }))
    }
  }
  const handleEmailChange = (e) => {
    const {value} = e.target;
    setEmail((prevState) => ({
      ...prevState,
      inputVal: value,
    }))
    if (value === '') {
      setEmail((prevState) => ({
        ...prevState,
        hasErr: true,
        errMsg: 'Required'
      }))
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      setEmail((prevState) => ({
        ...prevState,
        hasErr: true,
        errMsg: 'Invalid Email'
      }))
    }
    else {
      setEmail((prevState) => ({
        ...prevState,
        hasErr: false,
        errMsg: ''
      }))
    }
  }
  const handlePasswordChange = (e) => {
    const {value} = e.target;
    setPassword((prevState) => ({
      ...prevState,
      inputVal: value,
    }))
    if (value === '') {
      setPassword((prevState) => ({
        ...prevState,
        hasErr: true,
        errMsg: 'Required'
      }))
    }
    else if (value !== repassword.inputVal) {
      setRePassword((prevState) => ({
        ...prevState,
        hasErr: true,
        errMsg: 'Password not match'
      }))
    }
    else {
      setRePassword((prevState) => ({
        ...prevState,
        hasErr: false,
        errMsg: ''
      }))
    }
  }
  const handleRePasswordChange = (e) => {
    const {value} = e.target;
    setRePassword((prevState) => ({
      ...prevState,
      inputVal: value,
    }))
    if (value === '') {
      setRePassword((prevState) => ({
        ...prevState,
        hasErr: true,
        errMsg: 'Required'
      }))
    }
    else if (value !== password.inputVal) {
      setRePassword((prevState) => ({
        ...prevState,
        hasErr: true,
        errMsg: 'Password not match'
      }))
    }
    else {
      setRePassword((prevState) => ({
        ...prevState,
        hasErr: false,
        errMsg: ''
      }))
    }
  }

  // compare two password on submit
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar src={iconPic} className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={fName.inputVal}
                  helperText={fName.hasErr ? fName.errMsg : " "}
                  onChange={handleFNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lName.inputVal}
                  helperText={lName.hasErr ? lName.errMsg : " "}
                  onChange={handleLNameChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email.inputVal}
                helperText={email.hasErr ? email.errMsg : " "}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password.inputVal}
                helperText={password.hasErr ? password.errMsg : " "}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                name="re-enter-password"
                label="Re-enter Password"
                type="password"
                id="re-enter-password"
                autoComplete="re-enter-password"
                value={repassword.inputVal}
                helperText={repassword.hasErr ? repassword.errMsg : " "}
                onChange={handleRePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" style={{ color: "#900" }} />}
                label={<Typography style={{ color: "#900", fontSize: "0.8rem" }}>I want to receive inspiration, marketing promotions and updates via email.</Typography>}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.link} href="/users/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}