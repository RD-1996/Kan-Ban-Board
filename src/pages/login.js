import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { users } from "../data/users";
import * as userActions from "../store/reducers/user.slice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import "../assets/styles/register.scss";
import Reaptcha from "reaptcha";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alertInitialState = {
    open: false,
    message: null,
  };

  const [alert, setAlert] = useState(alertInitialState);
  const [error, setError] = useState({
    userName: false,
    password: false,
  });
  const [verified, setVerified] = useState(false);

  const checkLoginValidations = (userName, password) => {
    if (!verified) {
      setAlert({
        open: true,
        message: "Please resolve captcha",
      });
      return true;
    }
    let hasError = {
      userName: false,
      password: false,
    };
    if (!userName) {
      hasError = {
        ...hasError,
        userName: true,
      };
    }
    if (!password) {
      hasError = {
        ...hasError,
        password: true,
      };
    }
    setError(hasError);
    if (hasError?.userName || hasError?.password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
      });
      return true;
    }
    return false;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = data.get("userName");
    const password = data.get("password");

    const hasError = checkLoginValidations(userName, password);
    if (hasError) {
      return;
    }

    const userRecord = users.filter(
      (user) =>
        (user.userName === userName || user.email === userName) &&
        user.password === password
    );

    if (!userRecord.length) {
      setAlert({
        open: true,
        message: "Invalid credentials",
      });
      return;
    }

    let payload = {
      ...userRecord[0],
    };
    delete payload.password;
    dispatch(userActions.update(payload));
    goToDashboard();
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const redirectToRegister = () => {
    navigate("/signup");
  };

  const onVerify = (recaptchaResponse) => {
    setVerified(true);
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <div className="main-container">
        <div className="title">Login</div>
        <form onSubmit={handleLogin} className="form-container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="lastName"
                label="Username / Email"
                name="userName"
                autoComplete="family-name"
                size="small"
                error={error?.userName}
                helperText={error?.userName && "Please Enter Username / Email"}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                size="small"
                error={error?.password}
                helperText={error?.password && "Please Enter Password"}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ mt: 4 }}>
            <Grid item>
              <Reaptcha
                sitekey={process.env.REACT_APP_SITE_KEY}
                onVerify={onVerify}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link
                variant="body2"
                onClick={redirectToRegister}
                className="helper--text"
              >
                Not a member? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {alert?.open ? (
        <Snackbar
          open={alert?.open}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={() => {
              setAlert(alertInitialState);
            }}
            severity="error"
            sx={{ width: 200 }}
          >
            <AlertTitle>Error</AlertTitle>
            {alert?.message}
          </Alert>
        </Snackbar>
      ) : null}
    </Container>
  );
}
