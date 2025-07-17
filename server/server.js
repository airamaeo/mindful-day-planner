const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// Sart server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
