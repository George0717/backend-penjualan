const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');

// Create 
router.post('/', async (req, res) => {
    const invoicePost = new Invoice({
        namaCustomer: req.body.namaCustomer,
        alamatCustomer: req.body.alamatCustomer,
        tanggalPO: req.body.tanggalPO,
        noPOCustomer: req.body.noPOCustomer,
        namaPabrik: req.body.namaPabrik,
        alamatPabarik: req.body.alamatPabarik,
        noTelpon: req.body.noTelpon,
        noInvoice: req.body.noInvoice,
        noSuratJalan: req.body.noSuratJalan,
        subTotalitem: req.body.subTotalitem,
        totalBayar: req.body.totalBayar,
    });

    try {
        const invoice = await invoicePost.save();
        res.status(201).json({ message: "berhasil", data: invoice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find()
          .populate('namaCustomer')
          .populate('alamatCustomer')
          .populate('tanggalPO')
          .populate('noPOCustomer')
          .populate('noSuratJalan')
          .populate('subTotalitem')
          .populate('totalBayar');
        res.status(200).json({ message: "berhasil", data: invoices });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:invoiceID', async (req, res) => {
    const data = {
        namaCustomer: req.body.namaCustomer,
        alamatCustomer: req.body.alamatCustomer,
        tanggalPO: req.body.tanggalPO,
        noPOCustomer: req.body.noPOCustomer,
        namaPabrik: req.body.namaPabrik,
        alamatPabarik: req.body.alamatPabarik,
        noTelpon: req.body.noTelpon,
        noInvoice: req.body.noInvoice,
        noSuratJalan: req.body.noSuratJalan,
        subTotalitem: req.body.subTotalitem,
        totalBayar: req.body.totalBayar,
    };

    try {
        const invoice = await Invoice.updateOne({ _id: req.params.invoiceID }, data);
        res.status(200).json({ message: "berhasil", data: invoice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete
router.delete('/:invoiceID', async (req, res) => {
    try {
        const invoice = await Invoice.deleteOne({ _id: req.params.invoiceID });
        res.status(200).json({ message: "berhasil", data: invoice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
