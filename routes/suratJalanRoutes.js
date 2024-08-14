const express = require('express');
const router = express.Router();
const response = require('../config/response'); // Assuming this is your custom response handler
const SuratJalan = require('../models/suratJalan');

// Create 
router.post('/', async (req, res) => {
    try {
        // Generate the new Surat Jalan number
        const lastSuratJalan = await SuratJalan.findOne().sort({ noSuratJalan: -1 }).exec();
        const lastSuratNumber = lastSuratJalan ? lastSuratJalan.noSuratJalan : "000000";
        const numberPart = parseInt(lastSuratNumber, 10) || 0;
        const newSuratNumber = (numberPart + 1).toString().padStart(6, "0");

        // Create new Surat Jalan document
        const suratJalanPost = new SuratJalan({
            namaCustomer: req.body.namaCustomer,
            alamatCustomer: req.body.alamatCustomer,
            namaPabrik: req.body.namaPabrik,
            noSuratJalan: newSuratNumber, // Use the new Surat Jalan number
            tanggalPengiriman: req.body.tanggalPengiriman,
            platAngkutan: req.body.platAngkutan,
            namaStaff: req.body.namaStaff,
        });

        const suratJalan = await suratJalanPost.save();
        response(201, suratJalan, "berhasil", res);
    } catch (error) {
        response(500, null, error.message, res);
    }
});

// Read
router.get('/', async (req, res) => {
    try {
        const suratJalans = await SuratJalan.find().populate('namaCustomer');
        response(200, suratJalans, "berhasil", res);
    } catch (error) {
        response(500, null, error.message, res);
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
        response(200, suratJalan, "berhasil", res);
    } catch (error) {
        response(500, null, error.message, res);
    }
});

// Delete
router.delete('/:suratJalanID', async (req, res) => {
    try {
        const suratJalan = await SuratJalan.deleteOne({ _id: req.params.suratJalanID });
        response(200, suratJalan, "berhasil", res);
    } catch (error) {
        response(500, null, error.message, res);
    }
});

// Get Last Surat Jalan Number
router.get('/last', async (req, res) => {
    try {
        const lastSuratJalan = await SuratJalan.find()
            .sort({ noSuratJalan: -1 })
            .limit(1)
            .exec();

        if (lastSuratJalan.length === 0) {
            return response(200, { noSuratJalan: "000000" }, "No Surat Jalan found", res);
        }

        const lastSuratNumber = lastSuratJalan[0].noSuratJalan;
        const numberPart = parseInt(lastSuratNumber, 10) || 0;
        const newSuratNumber = (numberPart + 1).toString().padStart(6, "0");

        response(200, { noSuratJalan: newSuratNumber }, "Berhasil", res);
    } catch (error) {
        response(500, null, error.message, res);
    }
});

module.exports = router;
