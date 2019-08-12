const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedDevs = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedDevs[user] = socket.id
});

mongoose.connect('mongodb+srv://omnistack-user-db:W9FAyaTvYks0P8Pc@cluster0-h4uvn.mongodb.net/omnistack-week?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedDevs = connectedDevs;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);