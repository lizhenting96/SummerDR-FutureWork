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

// override Material-UI TextFiled
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    backgroundColor: "#900",
    "&:hover": {
      backgroundColor: "#B00",
    }
  },
  link: {
    color: "#900",
  },
}));

export default function SignIn() {
  const classes = useStyles();

  // states
  const [email, setEmail] = useState({inputVal: '', hasErr: false, errMsg: ''})
  const [password, setPassword] = useState({inputVal:'', hasErr: false, errMsg: ''})

  // handle states changes & form validation
  const handleEmailChange = (event) => {
    const {value} = event.target;
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
  const handlePasswordChange = (event) => {
    const {value} = event.target;
    setPassword((prevState) => ({
      ...prevState,
      inputVal: value,
    }))
    if (value ==='') {
      setPassword((prevState) => ({
        ...prevState,
        hasErr: true,
        errMsg: 'Required',
      }))
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar src={iconPic} className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={email.inputVal}
                name="email"
                autoComplete="email"
                autoFocus
                helperText={email.hasErr ? email.errMsg : " "}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                value={password.inputVal}
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={password.hasErr ? password.errMsg : " "}
                onChange={handlePasswordChange}
              />
            </Grid>

          </Grid>

          <FormControlLabel
            control={<Checkbox value="remember" style={{ color: "#900" }} />}
            label={<Typography style={{ color: "#900", fontSize: "0.8rem" }}>Remember me</Typography>}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link className={classes.link} href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className={classes.link} href="/users/signup" variant="body2" >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}