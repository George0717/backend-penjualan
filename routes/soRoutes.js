const express = require('express');
const router = express.Router();
const response = require('../config/response');
const SalesOrder = require('../models/so');

// Create 
router.post('/', async (req, res) => {
    try {
        const lastSalesOrder = await SalesOrder.findOne().sort({ nomorSO: -1 }).exec();
        const lastSoNumber = lastSalesOrder ? lastSalesOrder.nomorSO : "SOSPA00";
        const numberPart = parseInt(lastSoNumber.replace("SOSPA", "")) + 1;
        const newSoNumber = `SOSPA${numberPart.toString().padStart(2, "0")}`;

        const soPost = new SalesOrder({
            namaPelanggan: req.body.namaPelanggan,
            alamatPelanggan: req.body.alamatPelanggan,
            tanggalPO: req.body.tanggalPO,
            nomorPO: req.body.nomorPO,
            nomorSO: newSoNumber, // Gunakan nomorSO baru di sini
            barang: req.body.barang,
            subTotal: req.body.subTotal,
            diskon: req.body.diskon,
            uangMuka: req.body.uangMuka,
            ppn: req.body.ppn,
            totalBayar: req.body.totalBayar,
            tipePembayaran: req.body.tipePembayaran,
            jadwalPembayaran: req.body.jadwalPembayaran,
        });

        const salesOrder = await soPost.save();
        response(201, salesOrder, "berhasil", res);
    } catch (error) {
        res.json({ message: error.message });
    }
});


// Read
router.get('/', async (req, res) => {
    try {
        const salesOrders = await SalesOrder.find();
        response(200, salesOrders, "berhasil", res);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Update
router.put('/:salesOrderID', async (req, res) => {
    const data = {
        namaPelanggan: req.body.namaPelanggan,
        alamatPelanggan: req.body.alamatPelanggan,
        tanggalPO: req.body.tanggalPO,
        nomorPO: req.body.nomorPO,
        nomorSO: req.body.nomorSO,
        barang: req.body.barang,
        subTotal: req.body.subTotal,
        diskon: req.body.diskon,
        uangMuka: req.body.uangMuka,
        ppn: req.body.ppn,
        totalBayar: req.body.totalBayar,
        tipePembayaran: req.body.tipePembayaran,
        jadwalPembayaran: req.body.jadwalPembayaran,
    };

    try {
        const salesOrder = await SalesOrder.updateOne({ _id: req.params.salesOrderID }, data);
        response(200, salesOrder, "berhasil", res);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Delete
router.delete('/:salesOrderID', async (req, res) => {
    try {
        const salesOrder = await SalesOrder.deleteOne({ _id: req.params.salesOrderID });
        response(200, salesOrder, "berhasil", res);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.get('/last', async (req, res) => {
    try {
        const lastSalesOrder = await SalesOrder.find()
            .sort({ nomorSO: -1 })
            .limit(1)
            .exec();

        if (lastSalesOrder.length === 0) {
            return response(200, { nomorSO: "SOSPA00" }, "No Sales Order found", res);
        }

        const lastSoNumber = lastSalesOrder[0].nomorSO;
        const numberPart = parseInt(lastSoNumber.replace("SOSPA", ""), 10) || 0;
        const newSoNumber = `SOSPA${(numberPart + 1).toString().padStart(2, "0")}`;

        response(200, { nomorSO: newSoNumber }, "Berhasil", res);
    } catch (error) {
        res.json({ message: error.message });
    }
});


module.exports = router;
