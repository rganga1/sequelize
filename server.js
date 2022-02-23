const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const gcl=require("get-current-line").default;
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});
require("./routes/tutorial.route")(app);

//import sequelize db
const db=require("./models")
db.sequelize.sync({force:true}).then(()=>{console.log("Drop and re-sync db",gcl());});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});