const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Ensure this line is present to load .env variables

const app = express();
const quote = "Server is running";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Import routes
const soRoutes = require('./routes/soRoutes');
const jadwalKirimRoutes = require('./routes/jadwalKirimRoutes');
const suratJalanRoutes = require('./routes/suratJalanRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

// Register routes
app.use('/salesorder', soRoutes);
app.use('/jadwalkirim', jadwalKirimRoutes);
app.use('/suratjalan', suratJalanRoutes);
app.use('/invoice', invoiceRoutes);

// Connect to database
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log('Database is connected');
    })
    .catch((err) => {
        console.error('Error Establishing a Database Connection?', err);
    });

// Listen on the specified port and log a message
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT} ${quote}`);
});
