import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as userActions from "../store/reducers/user.slice";
import { users } from "../data/users";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "../assets/styles/register.scss";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialErrorState = {
    name: false,
    userName: false,
    email: false,
    password: false,
    contact: false,
  };

  const [error, setError] = useState(initialErrorState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileRef = useRef(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const redirectToSignIn = () => {
    navigate("/login");
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      userName: formData.get("userName"),
      contact: formData.get("contact"),
      email: formData.get("email"),
      password: formData.get("password"),
      // displayPicture: formData.get("profile-picture"),
    };

    const hasError = checkSignupValidations(data);
    if (hasError) {
      return;
    }

    let payload = {
      ...data,
    };
    delete payload.password;

    dispatch(userActions.update(payload));
    goToDashboard();
  };

  function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  function validatePhone(contact) {
    if (/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(contact)) {
      return true;
    }
    return false;
  }

  const checkIfEmailExists = (email) => {
    const doesUserExist = users.filter((user) => user.email === email);
    if (doesUserExist?.length) {
      return true;
    }
    return false;
  };

  const checkIfUserNameExists = (userName) => {
    const doesUserExist = users.filter((user) => user.userName === userName);
    if (doesUserExist?.length) {
      return true;
    }
    return false;
  };

  const checkSignupValidations = (data) => {
    const { name, userName, contact, email, password, photo } = data;

    let hasError = {
      name: false,
      userName: false,
      email: false,
      password: false,
      contact: false,
    };

    if (!name) {
      hasError = {
        ...hasError,
        name: "Please enter name",
      };
    }
    if (!userName) {
      hasError = {
        ...hasError,
        userName: "Please enter username",
      };
    }
    if (!email) {
      hasError = {
        ...hasError,
        email: "Please enter email",
      };
    }
    if (!password) {
      hasError = {
        ...hasError,
        password: "Please enter password",
      };
    }

    if (!validateEmail(email)) {
      hasError = {
        ...hasError,
        email: "Please enter valid email",
      };
    }

    if (contact && !validatePhone(contact)) {
      hasError = {
        ...hasError,
        contact: "Please enter valid contact",
      };
    }

    if (password && password?.length < 6) {
      hasError = {
        ...hasError,
        password: "Password should have atleast 6 characters",
      };
    }

    if (checkIfEmailExists(email)) {
      hasError = {
        ...hasError,
        email: "Email already exists",
      };
    }

    if (checkIfUserNameExists(userName)) {
      hasError = {
        ...hasError,
        userName: "Username already exists",
      };
    }

    if (
      hasError?.name ||
      hasError?.email ||
      hasError?.userName ||
      hasError?.password ||
      hasError?.contact
    ) {
      setError(hasError);
      return true;
    }

    setError(initialErrorState);
    return false;
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    fileRef.current.value = null;
  };

  return (
    <Container className="login-container" maxWidth="xs">
      <div className="main-container">
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                size="small"
                error={!!error?.name}
                helperText={error?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="userName"
                label="Username"
                name="userName"
                autoComplete="user-name"
                size="small"
                error={!!error?.userName}
                helperText={error?.userName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="contact"
                label="Contact Number"
                name="contact"
                autoComplete="contact"
                size="small"
                type="number"
                error={!!error?.contact}
                helperText={error?.contact}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                size="small"
                error={!!error?.email}
                helperText={error?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                size="small"
                error={!!error?.password}
                helperText={error?.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="profile-picture"
                label="Profile Picture"
                type="file"
                id="profile-picture"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onSelectFile}
                inputRef={fileRef}
                inputProps={{
                  accept: "image/*",
                }}
              />
              {selectedFile && (
                <div className="image--preview__body">
                  <div>
                    <HighlightOffIcon onClick={clearFile} className="icon" />
                  </div>
                  <img src={preview} className="image" />
                </div>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link
                variant="body2"
                onClick={redirectToSignIn}
                className="helper--text"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Container>
  );
}
