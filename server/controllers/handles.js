import express from "express";
import bcrypt from "bcrypt";
import { db } from "../index.js";

const router = express.Router();

export const handleSignIn = (req, res) => {
  const { signInData } = req.body;
  const { name: username, password: unhashedPassword } = signInData;
  const saltrounds = 10;

  bcrypt.hash(unhashedPassword, saltrounds, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      const sqlInsert = `INSERT INTO users_db (username, password) VALUES ( "${username}",  "${hash}")`;

      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log("error ", err);
          res.status(500).send("Error entering user data");
        } else {
          console.log(" result ", result);
          res.status(200).send("Entry Successfull");
        }
      });
      //console.log(`Username: ${username} , encrypted Password : ${hash}`);
    }
  });
};

export const handleLogIn = (req, res) => {
  const { logInData } = req.body;
  const { name: username, password: enteredPassword } = logInData;

  const sqlFetch = `SELECT * FROM users_db WHERE username = "${username}"`;

  db.query(sqlFetch, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving user data");
    } else {
      if (result.length === 0) {
        res.status(404).send("User cannot be found");
      } else {
        const correctPassword = result[0].password;

        bcrypt.compare(enteredPassword, correctPassword, (err, result) => {
          if (err) {
            res.status(500).send("Error Retrieving user data");
          } else if (result) {
            res.status(200).json({ data: username });
          } else {
            res.status(404).send("Wrong Password");
          }
        });
      }
    }
  });
};

export const handleCustomers = (req, res) => {
  const { customerData } = req.body;
  console.log(customerData);
  const sqlInsert = `INSERT INTO customer_data (orderDate, company, owner, item, quantity, weight, shipment, tracking, size, count, specification, checklist) VALUES ("${customerData.orderDate}", "${customerData.company}", "${customerData.owner}", "${customerData.item}", "${customerData.quantity}", "${customerData.weight}", "${customerData.shipment}", "${customerData.tracking}", "${customerData.size}", "${customerData.count}", "${customerData.specification}", "${customerData.checklist}")`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log("error", err);
      res.status(500).send("Error entering Customer data");
    } else {
      console.log("result", result);
      res.status(200).send("Data Submitted Successfully");
    }
  });
};

export const handleAdminData = (req, res) => {
  const sqlSelect = `SELECT owner, quantity, weight, count FROM customer_data`;

  db.query(sqlSelect, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      const owners = [];
      const quantities = [];
      const weights = [];
      const counts = [];

      results.forEach((row) => {
        owners.push(row.owner);
        quantities.push(row.quantity);
        weights.push(row.weight);
        counts.push(row.count);
      });

      const totalQuantity = quantities.reduce((acc, curr) => acc + curr, 0);
      const totalCount = counts.reduce((acc, curr) => acc + curr, 0);
      const totalWeight = weights.reduce((acc, curr) => acc + curr, 0);

      res.status(200).json({
        data: {
          owners,
          quantities,
          weights,
          counts,
          totalQuantity,
          totalCount,
          totalWeight,
        },
      });
    }
  });
};

export default router;
