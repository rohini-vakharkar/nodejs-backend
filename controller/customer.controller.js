const { response } = require("express");
const express = require("express");
const router = express.Router();

const db = require("../database");
const mySql = db();

router.get("/uselist", function (req, res) {
  mySql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({
        message: "Failed Connection",
      });
    }
    conn.query("SELECT * FROM user", (error, response) => {
      console.log("error,response", error, response);
      if (error) {
        return res.status(500).json({
          message: "Error due to Not fetching",
        });
      } else {
        if (response.length > 0) {
          conn.release();
          return res.json({
            message: "Successfully",
            data: response,
          });
        }
      }
    });
  });
});

router.get("/uselist/get", function (req, res) {
  const { id } = req.query;
  mySql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({
        message: "Failed Connection",
      });
    }
    conn.query("SELECT * FROM user WHERE id=?", [id], (error, response) => {
      if (error) {
        return res.status(500).json({
          message: "Error due to Not fetching",
        });
      } else {
        if (response.length > 0) {
          conn.release();
          return res.json({
            message: "Successfully",
            data: response,
          });
        }
      }
    });
  });
});

router.post("/userinfo", function (req, res) {
  const { name, phone, city, country, dob } = req.body;
  mySql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({
        message: "Failed Connection",
      });
    }
    conn.query(
      "INSERT INTO user(name,phone,city,country,dob) VALUES(?,?,?,?,?)",
      [name, phone, city, country, dob],
      (error, response) => {
        if (error) {
          return res.status(200).json({
            message: "Error Post",
          });
        } else {
          if (Object.keys(response).length > 0) {
            conn.release();
            return res.json({
              message: "Successfully",
              data: response,
            });
          }
        }
      }
    );
  });
});

router.put("/userinfo/:id", function (req, res) {
  const id = req.params.id;
  const { name, phone, city, country, dob } = req.body;
  mySql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({
        message: "Failed Connection",
      });
    }
    conn.query(
      "UPDATE user SET name=? , phone=? , city=? , country=? ,dob=? WHERE id=?",
      [name, phone, city, country, dob, id],
      (error, response) => {
        if (error) {
          return res.status(200).json({
            message: "ErrorUpdate Post",
          });
        } else {
          if (Object.keys(response).length > 0) {
            conn.release();
            return res.json({
              message: "Successfully",
              data: response,
              POST,
            });
          }
        }
      }
    );
  });
});

router.delete("/userinfo/:id", function (req, res) {
  const id = req.params.id;

  mySql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({
        message: "Failed Connection",
      });
    }
    conn.query("DELETE FROM user WHERE id=?", [id], (error, response) => {
      if (error) {
        return res.status(200).json({
          message: "Error occur during  Post",
        });
      } else {
        if (Object.keys(response).length > 0) {
          conn.release();
          return res.json({
            message: "Successfully",
            data: response,
          });
        }
      }
    });
  });
});
const pool = db();

module.exports = router;
