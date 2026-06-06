const express = require('express');
const rateLimit = require('express-rate-limit');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();


app.use(cors({
    origin: ['https://ai-code-reviewer-liard-seven.vercel.app', 'http://localhost:5173']
}));
// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // 20 requests per IP
    message: {
        error: 'Too many requests. Please try again later.'
    }
});
app.use(express.json());

// Sirf AI routes par apply hoga
app.use('/ai', limiter, aiRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;