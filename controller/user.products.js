const { response } = require("express");
const express = require("express");
const route = express.Router();

const db = require("../database");
const mySql = db();

route.get("/product", function (req, res) {
  mySql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({
        message: "Failed Connection",
      });
    }
    conn.query("SELECT * FROM products", (error, response) => {
      console.log("error,response", error, response);
      if (error) {
        return res.status(500).json({
          message: "Error due to Not fetching product List",
        });
      } else {
        if (response.length > 0) {
          conn.release();
          return res.json({
            message: "Successfully ",
            data: response,
          });
        }
      }
    });
  });
});

route.get("/product", function (req, res) {
  const { productId } = req.params;
  mySql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({
        message: "Failed Connection",
      });
    }
    conn.query(
      "SELECT * FROM products WHERE productId=?",
      [productId],
      (error, response) => {
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
      }
    );
  });
});

route.post("/productList", function (req, res) {
  const { id, name, price, quantity, image, details } = req.body;
  console.log("ID============= BACKEND", id);
  mySql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({
        message: "Failed Connection",
      });
    }
    conn.query(
      "INSERT INTO products(id,name, price, quantity, image, details) VALUES(?,?,?,?,?,?)",
      [id, name, price, quantity, image, details],
      (error, response) => {
        console.log("error----", error);
        if (error) {
          return res.status(200).json({
            message: "Not insert data ",
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

route.put("/productList:productId", function (req, res) {
  const productId = req.params.productId;
  const { name, price, quantity, image, details } = req.body;
  mySql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({
        message: "Failed Connection",
      });
    }
    conn.query(
      "UPDATE products SET name=? , price=? , quantity=? , image=? ,details=? WHERE productId=?",
      [name, price, quantity, image, details, productId],
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

route.delete("/productList:productId", function (req, res) {
  const id = req.params.id;

  mySql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({
        message: "Failed Connection",
      });
    }
    conn.query(
      "DELETE FROM products WHERE productId=?",
      [productId],
      (error, response) => {
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
      }
    );
  });
});
const pool = db();

module.exports = route;
