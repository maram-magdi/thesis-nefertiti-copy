// let express = require ('express');
import express from 'express';
import { fileURLToPath } from 'url';
let app = express();

import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// let http = require('http');
import http from 'http';
let server = http.createServer(app);

// Serve static files from node_modules directory
// app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', express.static('public'));
// app.use('/experience', express.static('public/experience'));

let port = process.env.PORT || 5173;
server.listen(port, () => (
    console.log("Server is listening at localhost:" + port)
));

// let io = require('socket.io');
// io = new io.Server(server);

import { Server } from "socket.io";
let io = new Server(server);