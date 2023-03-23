const express = require("express");
const log = express.Router();
const db = require("../database");
const mySql = db();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

log.post("/user", function (req, res) {
  const { email, password } = req.body;
  mySql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({
        message: "Failed Connection",
      });
    }
    conn.query(
      "SELECT * FROM login where email=?",
      [email],
      (error, response) => {
        console.log("error,response", error, response);
        if (error) {
          // conn.release();
          return res.status(500).json({
            message: "Error due to Not fetching",
          });
        } else {
          if (response.length > 0) {
            // conn.release();
            return res.json({
              message: "user already registered",
              // data: response,
            });
          } else {
            bcrypt.hash(password, 10).then((hash) => {
              conn.query(
                "INSERT INTO login(email,password) VALUES(?,?)",
                [email, hash],
                (error1, response1) => {
                  console.log("error1", error1, response1);
                  if (error1) {
                    // conn.release();
                    return res.status(500).json({
                      message: "Error due to Not fetching",
                    });
                  } else {
                    // conn.release();
                    return res.json({
                      message: "user successfuly logged in",
                      data: response1,
                    });
                  }
                }
              );
            });
          }
        }
      }
    );
  });
});

log.post("/login", function (req, res) {
  const { email, password } = req.body;
  mySql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({
        message: "Failed Connection",
      });
    }

    conn.query(
      "SELECT * FROM login where email=?",
      [email],
      (error, response) => {
        console.log("error,response", error, response);
        if (error) {
          // conn.release();
          return res.status(500).json({
            message: "Error due to Not fetching",
          });
        } else {
          if (response.length > 0) {
            // conn.release();
            console.log("response", response);
            bcrypt.compare(password, response[0].password).then((hash) => {
              console.log("hash", hash);
              if (hash) {
                const token = jwt.sign(
                  { email: email },
                  process.env.JWT_SECRET,
                  { expiresIn: "1d" }
                );
                // conn.release();
                return res.json({
                  message: "success",
                  token: token,
                });
              } else {
                conn.release();
                return res.json({
                  message: "please check password",
                });
              }
            });
          } else {
            conn.release();
            console.log("response", response);
            return res.json({
              message: "user doesnot exist please",
            });
          }
        }
      }
    );
  });
});
log.post("/profile/me", async (req, res) => {
  const token = String(req.headers["authorization"] || "");
  console.log("token", token);
  var base64Payload = token.split(" ")[1];
  var payload = jwt.decode(base64Payload);
  console.log("payload", payload);
  const { email } = payload;
  await mySql.getConnection((err, conn) => {
    if (err) {
      res.status(500).json({
        message: "Fail to connect",
      });
    }
    conn.query(
      "SELECT * FROM login WHERE email=?",
      [email],
      (err, response) => {
        if (err) {
          res.status(500).json({
            message: "Error during fetch the record",
          });
        } else {
          if (response.length > 0) {
            conn.release();
            res.status(200).json({
              message: "success",
              data: response,
            });
          }
        }
      }
    );
  });
});

module.exports = log;
