const express = require('express');
const router = express.Router();
const JadwalKirim = require('../models/jadwalKirim');

// Create
router.post('/', async (req, res) => {
    const jadwalKirimPost = new JadwalKirim({
        pilihCustomer: req.body.pilihCustomer,
        pilihNomorSo: req.body.pilihNomorSo,
        pilihTanggal: req.body.pilihTanggal,
    });

    try {
        const jadwalKirim = await jadwalKirimPost.save();
        res.status(201).json({ message: "Berhasil", data: jadwalKirim });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read
router.get('/', async (req, res) => {
    try {
        const jadwalKirims = await JadwalKirim.find().populate('pilihNomorSo');
        res.status(200).json({ message: "Berhasil", data: jadwalKirims });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:jadwalKirimID', async (req, res) => {
    const data = {
        pilihCustomer: req.body.pilihCustomer,
        pilihNomorSo: req.body.pilihNomorSo,
        pilihTanggal: req.body.pilihTanggal,
    };

    try {
        const jadwalKirim = await JadwalKirim.findByIdAndUpdate(req.params.jadwalKirimID, data, { new: true });
        res.status(200).json({ message: "Berhasil", data: jadwalKirim });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete
router.delete('/:jadwalKirimID', async (req, res) => {
    try {
        const jadwalKirim = await JadwalKirim.findByIdAndDelete(req.params.jadwalKirimID);
        res.status(200).json({ message: "Berhasil", data: jadwalKirim });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
