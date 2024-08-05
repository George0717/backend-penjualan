const express = require('express');
const router = express.Router();
const SuratJalan = require('../models/suratJalan');

// Create 
router.post('/', async (req, res) => {
    const suratJalanPost = new SuratJalan({
        namaCustomer: req.body.namaCustomer,
        alamatCustomer: req.body.alamatCustomer,
        namaPabrik: req.body.namaPabrik,
        noSuratJalan: req.body.noSuratJalan,
        tanggalPengiriman: req.body.tanggalPengiriman,
        platAngkutan: req.body.platAngkutan,
        namaStaff: req.body.namaStaff,
    });

    try {
        const suratJalan = await suratJalanPost.save();
        res.status(201).json({ message: "berhasil", data: suratJalan });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read
router.get('/', async (req, res) => {
    try {
        const suratJalans = await SuratJalan.find().populate('namaCustomer');
        res.status(200).json({ message: "berhasil", data: suratJalans });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:suratJalanID', async (req, res) => {
    const data = {
        namaCustomer: req.body.namaCustomer,
        alamatCustomer: req.body.alamatCustomer,
        namaPabrik: req.body.namaPabrik,
        noSuratJalan: req.body.noSuratJalan,
        tanggalPengiriman: req.body.tanggalPengiriman,
        platAngkutan: req.body.platAngkutan,
        namaStaff: req.body.namaStaff,
    };

    try {
        const suratJalan = await SuratJalan.updateOne({ _id: req.params.suratJalanID }, data);
        res.status(200).json({ message: "berhasil", data: suratJalan });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete
router.delete('/:suratJalanID', async (req, res) => {
    try {
        const suratJalan = await SuratJalan.deleteOne({ _id: req.params.suratJalanID });
        res.status(200).json({ message: "berhasil", data: suratJalan });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
