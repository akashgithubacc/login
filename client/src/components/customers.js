import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  FormHelperText,
} from "@mui/material";
import { sendCustomerData } from "../api";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const [submitted, setsubmitted] = useState(false);
  const navigate = useNavigate();

  const [customerData, setcustomerData] = useState({
    orderDate: null,
    company: "",
    owner: "",
    item: "",
    quantity: null,
    weight: null,
    shipment: "",
    tracking: "",
    size: null,
    count: null,
    specification: "",
    checklist: "",
  });

  const defaultValue = {
    orderDate: null,
    company: "",
    owner: "",
    item: "",
    quantity: 0,
    weight: 0,
    shipment: "",
    tracking: "",
    size: 0,
    count: 0,
    specification: "",
    checklist: "",
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name === "size") {
      const multiplicationRegex = /^\d+\s*\*\s*\d+\s*\*\s*\d+$/;

      if (multiplicationRegex.test(value)) {
        setcustomerData((prevCustomerData) => ({
          ...prevCustomerData,
          [name]: value,
        }));
      }
    } else {
      setcustomerData((prevCustomerData) => ({
        ...prevCustomerData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (customerData.size === null) {
      alert("Enter size in the given format");
    } else {
      sendCustomerData(customerData)
        .then((response) => {
          const adminData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      setcustomerData(defaultValue);
    }

    setsubmitted(true);
  };

  const hadnleOnSubmit = () => {
    setsubmitted(false);
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {submitted ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ width: "800px", height: "200px" }}
            onClick={hadnleOnSubmit}
          >
            <Typography variant="h4">
              SuccessFully, submitted. Go Back to Login
            </Typography>
          </Button>
        </Box>
      ) : (
        <Container>
          {" "}
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          ></Box>
          <Box style={{ paddingLeft: 60 }}>
            <Typography variant="h5">Enter the following data:- </Typography>
          </Box>
          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormHelperText>Enter Order Date</FormHelperText>
                <TextField
                  required
                  fullWidth
                  name="orderDate"
                  value={customerData.orderDate}
                  type="date"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="company"
                  label="Enter Company Name"
                  type="text"
                  onKeyDown={(event) => {
                    const isValidKey = /[a-zA-Z0-9]/i.test(event.key);
                    if (!isValidKey) {
                      event.preventDefault();
                    }
                  }}
                  value={customerData.company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="owner"
                  label="Enter Owner Name (Same as Username)"
                  type="text"
                  onKeyDown={(event) => {
                    const isValidKey = /[a-zA-Z0-9]/i.test(event.key);
                    if (!isValidKey) {
                      event.preventDefault();
                    }
                  }}
                  value={customerData.owner}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="item"
                  label="Enter Item Name"
                  type="string"
                  value={customerData.item}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="quantity"
                  label="Enter the Quantity"
                  type="Number"
                  value={customerData.quantity}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="weight"
                  label="Enter Weight"
                  type="Number"
                  step="any"
                  value={customerData.weight}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="shipment"
                  label="Request for Shipment"
                  type="text"
                  value={customerData.shipment}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="tracking"
                  label="Enter Tracking ID"
                  type="text"
                  value={customerData.tracking}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="size"
                  label="Enter Shipment size in form of L*B*H"
                  type="text"
                  value={customerData.size}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="count"
                  label="Enter Box Count"
                  type="Number"
                  value={customerData.count}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="specification"
                  label="Specifications"
                  type="text"
                  value={customerData.specification}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="checklist"
                  label="Checklist Quantity"
                  type="text"
                  value={customerData.checklist}
                  onChange={handleChange}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit Data
              </Button>
            </Grid>
          </Box>
        </Container>
      )}
    </Container>
  );
};

export default Customers;
