// npm install express scoket.io

const { Socket } = require('engine.io');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io')

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) =>{
    res.sendFile(__dirname + 'Client.html');
});

let player1Choise = null;
let player2Choise = null;

io.on('playerMove', (choice)=>{
    if(player1Choise === null){
        player1Choise = choice;
        Socket.emit('gameResult', 'Waiting for player 2...');
    } else if(player2Choise === null) {
        player2Choise = choice;
        const result = detemineWinner(player1Choise, player2Choise);
        io.emit('gameResult', result);
        let player1Choise = null;
        let player2Choise = null;
    }
});

Socket.on('disconnect', ()=>{
    console.log("user disconnected!")
})

function detemineWinner
    (playerChoice, opponenetChoice){
        if(playerChoice === opponenetChoice) { return "Draw"; }
        if(playerChoice === 'rock' && opponenetChoice === 'scissors' ||
        playerChoice === 'scissors' && opponenetChoice === 'paper' ||
        playerChoice === 'paper' && opponenetChoice === 'rock')
        { return 'You Win!'; }
        else {
            return 'You Loose!';
        }
}

server.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000")
})

