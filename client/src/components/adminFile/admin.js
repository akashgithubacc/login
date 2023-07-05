import React, { useState, useEffect } from "react";
import { getAdminData } from "../../api";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Admin = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    getAdminData()
      .then((response) => {
        setAdminData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (adminData.data) {
      console.log(adminData.data);
    }
  }, [adminData]);

  const {
    counts,
    owners,
    quantities,
    weights,
    totalCount,
    totalQuantity,
    totalWeight,
  } = adminData.data || {};

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Paper
      style={{
        paddingLeft: "500px",
        paddingTop: "100px",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h3" style={{ paddingBottom: "20px" }}>
        Admin Data
      </Typography>
      <TableContainer style={{ maxWidth: "100%", paddingBottom: "20px" }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Item Details</StyledTableCell>
            {owners &&
              owners.map((owner, index) => (
                <StyledTableCell key={index}>{owner}</StyledTableCell>
              ))}
            <StyledTableCell>Total of Item Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Item Quantity</StyledTableCell>
            {quantities &&
              quantities.map((quantity, index) => (
                <StyledTableCell key={index}>{quantity}</StyledTableCell>
              ))}
            <StyledTableCell>{totalQuantity && totalQuantity}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Item Weight</StyledTableCell>
            {weights &&
              weights.map((weight, index) => (
                <StyledTableCell key={index}>{weight}</StyledTableCell>
              ))}
            <StyledTableCell>{totalWeight && totalWeight}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Box Count</StyledTableCell>
            {counts &&
              counts.map((count, index) => (
                <StyledTableCell key={index}>{count}</StyledTableCell>
              ))}
            <StyledTableCell>{totalCount && totalCount}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </TableContainer>

      <Button variant="contained" onClick={handleClick}>
        {" "}
        Back to Login
      </Button>
    </Paper>
  );
};

export default Admin;
