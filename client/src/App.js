import React from "react";
import SignUp from "./components/signUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Login from "./components/login";
import Customers from "./components/customers";
import Admin from "./components/adminFile/admin";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element=<Login /> />
          <Route path="/signUp" element=<SignUp /> />
          <Route path="/customers" element=<Customers /> />
          <Route path="/admin" element=<Admin /> />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
