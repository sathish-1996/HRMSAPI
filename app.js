const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
// const sequelize = require('sequelize');
const cors = require("cors");
const app = express();
const passport= require('passport');
require('./middleware/passport')(passport);
const bodyParser = require('body-parser');
const  sequelize = require('./util/database.js');


const path = require("path")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());


global.__dirname = __dirname

// Import your routes   
const router = require("./routes/user.js");
const blogRouter = require("./routes/blog.js");
const assignmentsRouter = require("./routes/createAssignment.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use('/upload', express.static(path.join(__dirname, 'upload')))
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.get("/", (req, res) => res.send({ message: 'Server Working on this address' }))

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.use("/api/assignment", assignmentsRouter);

// User.hasMany(User);
//  User.belongsTo(User);


 sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log('Server is running on port', process.env.PORT || 3000);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });