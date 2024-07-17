const express = require('express');


const app = express();

app.use(express.json());

function middleWareTicket(req, res, next) {
    const ticket = req.query.ticket;
    if (ticket=="false") {
        return res.status(401).json({ error: 'Missing ticket' });
    }
    else{
        next();
    }
}

function middleWareAge(req, res, next) {
    const age = req.query.age;
    if (age<15) {
        return res.status(401).json({ error: 'under aged children not allowed' });
    }
    else{
        next();
    }
}

app.use(middleWareTicket)
app.use(middleWareAge)


app.get('/ride-1',function(req,res){
    res.send("welcome to ride - 1 ");
})

app.get('/ride-2',function(req,res){
    res.send("welcome to ride - 2 ");
})

app.get('/ride-3',function(req,res){
    res.send("welcome to ride - 3 ");
})

app.get('/ride-4',function(req,res){
    res.send("welcome to ride - 4 ");
})

app.listen(3000);