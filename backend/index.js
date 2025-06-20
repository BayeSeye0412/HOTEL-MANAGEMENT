// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('API Hôtel Management opérationnelle 🚀');
});

// Port
const PORT = process.env.PORT || 5000;

// Connexion MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connecté');
        
        // Routes
        const authRoutes = require('./routes/auth');
        const hotelRoutes = require('./routes/hotels');
        
        app.use('/api/auth', authRoutes);
        app.use('/api/hotels', hotelRoutes);

        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Erreur MongoDB :', err.message);
    });
