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
} from "@mui/material";
import { Link } from "react-router-dom";
import { FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { sendSigninData } from "../api";

const SignUp = () => {
  const navigate = useNavigate();
  const [signInData, setsignInData] = useState({
    name: "",
    password: "",
    confirmpassword: "",
    passwordMatchError: false,
  });

  const [formHelper, setformHelper] = useState(
    "Confirm Password and Password Should Match"
  );

  const handleChange = (e) => {
    const { value, name } = e.target;

    setsignInData((prevSignInData) => ({
      ...prevSignInData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signInData.password === signInData.confirmpassword) {
      // Send the data to the backend
      sendSigninData(signInData)
        .then((response) => {
          if (response.status === 200) {
            navigate("/");
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setformHelper("Confirm Password and Password Should Match");
      setsignInData({
        name: "",
        password: "",
        confirmpassword: "",
        passwordMatchError: false,
      });
    } else {
      setformHelper("Confirm Password and Password do not match");
      setsignInData((prevSignInData) => ({
        ...prevSignInData,
        passwordMatchError: true, // Set password match error to true
      }));
    }
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
      <Box style={{ paddingLeft: 145 }}>
        <Typography variant="h5">Sign up</Typography>
      </Box>

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
              value={signInData.name}
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
              value={signInData.password}
              onChange={handleChange}
              error={signInData.passwordMatchError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              value={signInData.confirmpassword}
              onChange={handleChange}
              error={signInData.passwordMatchError}
            />
          </Grid>
          <FormHelperText style={{ paddingLeft: 50 }} sx={{ mt: 2 }}>
            {formHelper}
          </FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2" underline="none">
                <Link to="/">Already have an account? Log in</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUp;
