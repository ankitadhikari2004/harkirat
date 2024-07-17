const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://ankit1977:%40542367kK@cluster0.quwnfil.mongodb.net/users_data", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

const User = mongoose.model("User", {
    name: String,
    username: String,
    password: String
});

app.use(express.json());

app.post('/signup', async function(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const userExist = await User.findOne({ username: username });

        if (!userExist) {
            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password
            });

            await newUser.save();
            res.json({ message: 'User Created Successfully' });
        } else {
            res.status(400).json({ message: 'User already exists' });
        }
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});