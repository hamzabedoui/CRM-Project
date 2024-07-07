import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  getUserDetails,
  selectLogin,
} from "../../redux/features/loginSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import Cookies from "js-cookie";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectLogin);
  const userInfos = useSelector((store) => store.login.userInfos);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUser({ email, password }));
    console.log(response);
    console.log(userInfos);

    if (response.meta.requestStatus === "fulfilled") {
      dispatch(getUserDetails());
    }
  };

  useEffect(() => {
    if (userInfos?.role === "client") {
      navigate("/main-client/home");
    } else if (userInfos?.role === "responsable") {
      navigate("/main-responsable/home");
    } else {
      console.log(userInfos);
    }
  }, [userInfos, navigate]);

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Welcome to our CRM application</Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
            disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          {error && (
            <Typography color="error">
              please verify your information
            </Typography>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register">Don't have an account? Register</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
