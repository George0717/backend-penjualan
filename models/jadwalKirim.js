const mongoose = require("mongoose");

const JadwalKirimSchema = new mongoose.Schema({
  pilihCustomer: { type: String, required: true },
  pilihNomorSo: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder', required: true },
  pilihTanggal: { type: Date, required: true },
});

module.exports = mongoose.model("JadwalKirim", JadwalKirimSchema);
