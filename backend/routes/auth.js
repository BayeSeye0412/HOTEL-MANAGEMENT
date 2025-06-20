const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token JWT
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Utilisateur déjà existant' });

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mot de passe oublié
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cet email' });
    }

    // Générer un token de réinitialisation (expire dans 1 heure)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // En production, vous devriez envoyer un email avec le lien de réinitialisation
    // Pour cet exemple, nous retournons juste un message de succès
    console.log(`Token de réinitialisation pour ${email}: ${resetToken}`);

    res.json({ 
      message: 'Un email de réinitialisation a été envoyé à votre adresse email.',
      resetToken: resetToken // En production, ne pas retourner le token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Réinitialisation du mot de passe
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token et nouveau mot de passe requis' });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: 'Token invalide' });
    }

    // Hash du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Token invalide ou expiré' });
    }
    res.status(500).json({ message: err.message });
  }
});

// Vérification du token
router.get('/verify', auth, async (req, res) => {
  try {
    res.json({ 
      user: { 
        id: req.user._id, 
        username: req.user.username, 
        email: req.user.email, 
        isAdmin: req.user.isAdmin 
      } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
