const express = require('express');


const app = express();
app.use(express.json());

let requestCount = 0;

function countRequest(req, res, next) {
    requestCount++;
    console.log(requestCount);
    next();
}


app.use(countRequest);



app.get('/',function(req,res){
    res.send("hello this is req 1");
})



app.listen(3000);
