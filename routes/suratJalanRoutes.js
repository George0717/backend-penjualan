const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const response = require('../config/response'); // Assuming this is your custom response handler
const SuratJalan = require('../models/suratJalan');

// Create
router.post(
    '/',
    [
        check('namaCustomer').notEmpty().withMessage('Nama Customer wajib diisi'),
        check('alamatCustomer').notEmpty().withMessage('Alamat Customer wajib diisi'),
        check('namaPabrik').notEmpty().withMessage('Nama Pabrik wajib diisi'),
        check('tanggalPengiriman').notEmpty().withMessage('Tanggal Pengiriman wajib diisi'),
        check('platAngkutan').notEmpty().withMessage('Plat Angkutan wajib diisi'),
        check('namaStaff').notEmpty().withMessage('Nama Staff wajib diisi'),
    ],
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { namaCustomer, alamatCustomer, namaPabrik, tanggalPengiriman, platAngkutan, namaStaff } = req.body;

        // Generate the new Surat Jalan number
        const lastSuratJalan = await SuratJalan.findOne().sort({ noSuratJalan: -1 }).exec();
        const lastSuratNumber = lastSuratJalan ? lastSuratJalan.noSuratJalan : "000000";
        const numberPart = parseInt(lastSuratNumber, 10) || 0;
        const newSuratNumber = (numberPart + 1).toString().padStart(6, "0");

        // Create new Surat Jalan document
        const suratJalanPost = new SuratJalan({
            namaCustomer,
            alamatCustomer,
            namaPabrik,
            noSuratJalan: newSuratNumber,
            tanggalPengiriman,
            platAngkutan,
            namaStaff,
        });

        const suratJalan = await suratJalanPost.save();
        response(201, suratJalan, "Berhasil", res);
    })
);

// Read
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const suratJalans = await SuratJalan.find().populate('namaCustomer');
        response(200, suratJalans, "Berhasil", res);
    })
);

// Update
router.put(
    '/:suratJalanID',
    [
        check('namaCustomer').notEmpty().withMessage('Nama Customer wajib diisi'),
        check('alamatCustomer').notEmpty().withMessage('Alamat Customer wajib diisi'),
        check('namaPabrik').notEmpty().withMessage('Nama Pabrik wajib diisi'),
        check('tanggalPengiriman').notEmpty().withMessage('Tanggal Pengiriman wajib diisi'),
        check('platAngkutan').notEmpty().withMessage('Plat Angkutan wajib diisi'),
        check('namaStaff').notEmpty().withMessage('Nama Staff wajib diisi'),
    ],
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const data = {
            namaCustomer: req.body.namaCustomer,
            alamatCustomer: req.body.alamatCustomer,
            namaPabrik: req.body.namaPabrik,
            noSuratJalan: req.body.noSuratJalan,
            tanggalPengiriman: req.body.tanggalPengiriman,
            platAngkutan: req.body.platAngkutan,
            namaStaff: req.body.namaStaff,
        };

        const suratJalan = await SuratJalan.findByIdAndUpdate(req.params.suratJalanID, data, { new: true });
        if (!suratJalan) {
            return response(404, null, "Surat Jalan tidak ditemukan", res);
        }
        response(200, suratJalan, "Berhasil", res);
    })
);

// Delete
router.delete(
    '/:suratJalanID',
    asyncHandler(async (req, res) => {
        const suratJalan = await SuratJalan.findByIdAndDelete(req.params.suratJalanID);
        if (!suratJalan) {
            return response(404, null, "Surat Jalan tidak ditemukan", res);
        }
        response(200, suratJalan, "Berhasil", res);
    })
);

// Get Last Surat Jalan Number
router.get(
    '/last',
    asyncHandler(async (req, res) => {
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
    })
);

module.exports = router;
