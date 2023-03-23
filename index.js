const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
// const userRoutes = require("./controller/customer.controller");
const router = require("./controller/customer.controller");
const userRouter = require("./controller/user.controller");
const route = require("./controller/user.products");
const PORT = process.env.PORT || 9000;
const abc = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
];
app.use(cors());
app.use(bodyparser.json({limit:'50mb'}));
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  // res.status(201).json({
  //   message: abc,
  // });
  res.render("index.ejs");
});
app.use("/api", router);
app.use("/api", route);
app.use("/api", userRouter);
app.listen(PORT, () =>
  console.log(`your application is running on http://localhost:${PORT}`)
);
