require('dotenv').config();

const express = require('express');

const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require('./config/db');

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to a MariaDB application." });
});

//require("./routes/user.routes")(app);
app.use('/login', require('./routes/auth.routes'));


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

