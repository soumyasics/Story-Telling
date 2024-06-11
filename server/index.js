const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = 4025;
app.use(express.static(`${__dirname}/upload`));
app.use(bodyparser.urlencoded({ extended: false }));
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const route = require("./routes");
app.use("/", route);


app.listen(port, () => {
  console.log(`port is created at ${port}`);
});
