const express = require('express');
const app = express();

// Store request counts per user ID
let numberOfRequests = {};

// Middleware to limit requests
function rateLimiter(req, res, next) {
    const id = req.headers["user-id"];

    if (!id) {
        return res.status(400).json({ error: 'Missing user-id header' });
    }

    if (numberOfRequests[id]) {
        numberOfRequests[id]++;
        if (numberOfRequests[id] > 5) {
            return res.status(429).json({ error: 'Too many requests' });
        }
    } else {
        numberOfRequests[id] = 1;
    }

    // Reset the count after 1 second for the specific user
    setTimeout(() => {
        numberOfRequests[id] = Math.max(0, (numberOfRequests[id] || 0) - 1);
    }, 5000);

    next();
}

// Apply rate limiter middleware to all routes
app.use(rateLimiter);

// Example route
app.get('/', function(req, res) {
    res.send("hello");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});