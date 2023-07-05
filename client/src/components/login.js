import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  FormHelperText,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { sendLoginData } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [logInData, setlogInData] = useState({
    name: "",
    password: "",
  });

  const [formHelper, setformHelper] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;

    setlogInData((prevLogInData) => ({
      ...prevLogInData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendLoginData(logInData)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          if (logInData.name === "admin") {
            navigate("/admin");
          } else {
            navigate("/customers");
          }

          setformHelper("");
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          //formhelper set to wrong password
          setformHelper("Wrong Username or Password");
        }
      });

    setlogInData({
      name: "",
      password: "",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></Box>
      <Box style={{ paddingLeft: 160 }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
      </Box>
      <Box style={{ paddingLeft: 156 }}>
        <Typography variant="h5">Log in</Typography>
      </Box>
      <FormHelperText style={{ paddingLeft: 100 }} sx={{ mt: 2 }}>
        {formHelper}
      </FormHelperText>
      <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="name"
              onKeyDown={(event) => {
                const isValidKey = /[a-zA-Z0-9]/i.test(event.key);
                if (!isValidKey) {
                  event.preventDefault();
                }
              }}
              label="Enter your Username"
              value={logInData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={logInData.password}
              onChange={handleChange}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2" underline="none">
                <Link to="/signUp">New User? Sign Up</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
