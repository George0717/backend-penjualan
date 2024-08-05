const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  namaCustomer: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder', required: true },
  alamatCustomer: { type: mongoose.Schema.Types.ObjectId, ref: 'JadwalKirim', required: true },
  tanggalPO: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder', required: true },
  noPOCustomer: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder', required: true },
  namaPabrik: { type: String, required: true },
  alamatPabarik: { type: String, required: true },
  noTelpon: { type: Number, required: true },
  noInvoice: { type: Number, required: true },
  noSuratJalan: { type: mongoose.Schema.Types.ObjectId, ref: 'SuratJalan', required: true },
  subTotalitem: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder', required: true },
  totalBayar: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder', required: true },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
