// set up server
const http = require('http');
const express = require('express');
//const db = require()

const port = process.env.PORT || 3000
const host = process.env.HOST || '127.0.0.1'

const app = express();

const server = http.createServer(app);

//include middleware (static files, json, urlencoded)
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//listen for requests
server.listen(3000, '127.0.0.1',()=> {
    console.log(`server listening at http://${host}:${port}/`);
    
})

