// let express = require ('express');
import express from 'express';
import { fileURLToPath } from 'url';
let app = express();

import path, { delimiter } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// let http = require('http');
import http from 'http';
let server = http.createServer(app);

// Serve static files from node_modules directory
// app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// for the Nefertiti model:
app.use('/', express.static('public'));
// app.use('/experience', express.static('public/experience'));

// for the 90 screen: 
app.use('/90', express.static('screen90'));

// for the 180 screen: 
app.use('/180', express.static('screen180'));

// for the 270 screen: 
app.use('/270', express.static('screen270'));

let port = process.env.PORT || 5173;
server.listen(port, () => (
    console.log("Server is listening at localhost:" + port)
));

// let io = require('socket.io');
// io = new io.Server(server);

import { Server } from "socket.io";
let io = new Server(server);

import { SerialPort } from 'serialport';
// let parsers = SerialPort.parsers;

import { ReadlineParser } from '@serialport/parser-readline';
let arduinoPort = new SerialPort({
    path: 'COM3',
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

let parser = arduinoPort.pipe(new ReadlineParser ({
    delimiter: '\r\n'
}));

// let parser = parsers.Readline({
//     delimiter: '\r\n'
// });

// arduinoPort.pipe(parser);
parser.on('data', (data) => {
    console.log(data);
    io.emit('sensorInfo', data);
});

let currentDegree = 0;
// let screen90 = false;
// let screen180 = false; 
// let screen270 = false;
// let screenDegree = 0;

io.on('connection', (socket) => {
    socket.on('degreeForNefertiti', (data) => {
        currentDegree = data;
        console.log(currentDegree);

        // if (currentDegree === 90){
        //     // screen90 = true;
        //     // screen180 = false; 
        //     // screen270 = false;
        //     // io.emit('screen90State', screen90);

        //     screenDegree = 90;
        // } else if (currentDegree === 180){
        //     // screen180 = true;
        //     // screen90 = false; 
        //     // screen270 = false;
        //     // io.emit('screen180State', screen180);

        //     screenDegree = 180;
        // } else if (currentDegree === 270){
        //     // screen270 = true;
        //     // screen90 = false;
        //     // screen180 = false; 
        //     // io.emit('screen270State', screen270);

        //     screenDegree = 270;
        // } else {
        //     // screen90 = false;
        //     // screen180 = false; 
        //     // screen270 = false;

        //     screenDegree = 0;
        // }

        io.emit('currentDegree', currentDegree);

    })
})

// Socket.on('degreeForNefertiti', (data) => {
//     currentDegree = data;
//     console.log(currentDegree);
// });