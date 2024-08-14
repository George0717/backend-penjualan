const mongoose = require('mongoose');

const SuratJalanSchema = new mongoose.Schema({
  namaCustomer: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder', required: true },
  alamatCustomer: { type: String, required: true },
  namaPabrik: { type: String, required: true },
  noSuratJalan: { type: String, required: true }, // Changed from Number to String
  tanggalPengiriman: { type: Date, required: true },
  platAngkutan: { type: String, required: true },
  namaStaff: { type: String, required: true },
});

module.exports = mongoose.model("SuratJalan", SuratJalanSchema);
