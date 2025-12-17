const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config()

const cors = require("cors");
const path = require('path');
const logger = require('morgan')

const userRouter = require('./controller/users.js')
const listsRouter = require('./controller/lists.js')

const db = require('./model')
const port = process.env.PORT || 5000;

db.sequelize.authenticate()
    .then(() => console.log(" db connected."))
    .catch (err => console.error("Unable to connect to the database:", err));

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/', userRouter);
app.use('/lists', listsRouter);

app.use(express.static(path.join(__dirname, 'KeList-App', 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'KeList-App', 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`App running on port ${port}, (http://localhost:5000/)`);
});



