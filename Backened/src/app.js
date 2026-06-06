const express = require('express');
const rateLimit = require('express-rate-limit');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();
app.use(express.json());


app.use(cors()); // Ye line sabse simple hai, koi bhi port se access allow karegi
// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // 20 requests per IP
    message: {
        error: 'Too many requests. Please try again later.'
    }
});


// Sirf AI routes par apply hoga
app.use('/ai', limiter, aiRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;