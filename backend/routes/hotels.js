const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token JWT
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

// Obtenir tous les hôtels
router.get('/', auth, async (req, res) => {
  try {
    const hotels = await Hotel.find({ isActive: true })
      .select('-__v')
      .sort({ createdAt: -1 });
    
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtenir un hôtel par ID
router.get('/:id', auth, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).select('-__v');
    
    if (!hotel) {
      return res.status(404).json({ message: 'Hôtel non trouvé' });
    }
    
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Créer un nouvel hôtel
router.post('/', auth, async (req, res) => {
  try {
    const { name, address, email, phone, pricePerNight, currency, description, amenities } = req.body;

    // Vérifier si l'email existe déjà
    const existingHotel = await Hotel.findOne({ email });
    if (existingHotel) {
      return res.status(400).json({ message: 'Un hôtel avec cet email existe déjà' });
    }

    const hotel = new Hotel({
      name,
      address,
      email,
      phone,
      pricePerNight,
      currency,
      description,
      amenities,
      createdBy: req.userId
    });

    const savedHotel = await hotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Données invalides', errors: err.errors });
    }
    res.status(500).json({ message: err.message });
  }
});

// Mettre à jour un hôtel
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, address, email, phone, pricePerNight, currency, description, amenities, isActive } = req.body;

    // Vérifier si l'email existe déjà (sauf pour cet hôtel)
    if (email) {
      const existingHotel = await Hotel.findOne({ email, _id: { $ne: req.params.id } });
      if (existingHotel) {
        return res.status(400).json({ message: 'Un hôtel avec cet email existe déjà' });
      }
    }

    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        address,
        email,
        phone,
        pricePerNight,
        currency,
        description,
        amenities,
        isActive
      },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!hotel) {
      return res.status(404).json({ message: 'Hôtel non trouvé' });
    }

    res.json(hotel);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Données invalides', errors: err.errors });
    }
    res.status(500).json({ message: err.message });
  }
});

// Supprimer un hôtel (soft delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ message: 'Hôtel non trouvé' });
    }

    res.json({ message: 'Hôtel supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtenir les statistiques des hôtels
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const totalHotels = await Hotel.countDocuments({ isActive: true });
    const totalRevenue = await Hotel.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, total: { $sum: '$pricePerNight' } } }
    ]);

    const currencyStats = await Hotel.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$currency', count: { $sum: 1 } } }
    ]);

    res.json({
      totalHotels,
      totalRevenue: totalRevenue[0]?.total || 0,
      currencyStats
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 