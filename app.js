/*

INSTALL
npm i axios
npm i dotenv
npm i express
npm i nodemon 

-----STEPS WHEN CREATING OUR SERVER WITH EXPRESS------------
1. Installed Nodemon npm i nodemon this will have our server updating whothout having to close it 
2. Import our Packages called Express, Nodemon , Axios , FS, Dotenv
3. We then use our Dotenv to use our Express Imports as well as our port and API KEYS 
4. We then create our ROUTES to naivigate through our Local Host URL 
------METHODS AND DEFINITONS WE USE---------

* Axios is a Javascript library that implements the Promise API, 
which is native to JS ES6 and is used to make HTTP requests from node. js 
or XMLHttpRequests from the browser.

*A dotenv file (.
Dotenv files are used to load environment variables from a . env file into the running process.

*The Node.js file system module allows you to work with the file system on your computer.
 To include the File System module, use the require() method:

*req. param() searches the URL path, body, and query string of the request (in that order) for the specified parameter.
  If no parameter value exists anywhere in the request with the given name ,
  it returns undefined or the optional defaultValue if specified.

  *The server.listen() is an inbuilt application programming interface of class Socket within tls module
   which is used to start the server to listen the encrypted connection.

   *The keyword async before a function makes the function return a promise:


*/

import fs from 'fs'
import express from 'express'
import axios from 'axios' 
import *  as dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = 5000
const apiKey  = process.env.APIKEY;

//here we will create our routes for our GET request to  reecieve our data.

app.get('/', (req, res)=>{
    fs.readFile('./index.html', (err,data)=>{
        res.write(data)
        res.end()
    })
})

app.get('/api', (req, res)=>{
    fs.readFile('./fun.html', (err,data)=>{
        res.write(data)
        res.end()
    })
})

//Here we create a route  url for our API 

app.get("/api/news/:country/:category", async (req, res)=>{
    const country = req.params.country
    const category = req.params.category
    let response;
    response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`
    );
    const artPointer = Math.floor(Math.random() * response.data.articles.length);
    res.status(200).json(response.data.articles[artPointer]);
})

app.listen(port, (err)=>{
    if(err) throw err;
    console.log(`listening on port ${port}`)
})