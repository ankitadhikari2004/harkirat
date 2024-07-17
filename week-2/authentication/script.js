const express = require('express')
const jwt = require('jsonwebtoken')
const jwtPassword = '123456'

const app = express()
app.use(express.json())

const users =[{
    username: 'user1',
    password: '123456',
    name: 'Ankit'
},{
    username: 'user2',
    password: '789012',
    name: 'John'
},{
    username: 'user3',
    password: '321654',
    name: 'Alice'
},{
    username: 'user4',
    password: '456789',
    name: 'Bob'
},{
    username: 'user5',
    password: '567890',
    name: 'Charlie'
}]


function userExist(username,password){
    let flag = false;
    for(let i=0;i<users.length;i++){
        if(users[i].username == username && users[i].password == password){
            flag = true;
            break;
        }
    }

    return flag;

}



app.post("/signin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    if(!userExist(username,password)){
        return res.status(401).json({error: 'Invalid Credentials'});
    }

    var token = jwt.sign({username:username},jwtPassword);
    return res.json({token,})

});

app.get("/users",function(req,res){
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token,jwtPassword);
        const username = decoded.username;

        res.json({
            users: users.filter(function(value){
                if(value.username==username){
                    return false;
                }
                else{
                    return true;
                }
            })
        })


    }
    catch(err){
        return res.status(401).json({error: 'Invalid Token'});
    }
});



app.listen(3000);