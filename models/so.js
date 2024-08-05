const mongoose = require("mongoose");

const SalesOrderSchema = new mongoose.Schema({
  namaPelanggan: { type: String, required: true },
  alamatPelanggan: { type: String, required: true },
  tanggalPO: { type: Date, required: true },
  nomorPO: { type: String, required: true },
  nomorSO: { type: String, required: true },
  barang: [
    {
      kuantitas: { type: Number, required: true },
      jenisPacking: { type: String, required: true },
      namaBarang: { type: String, required: true },
      harga: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  subTotal: [
    {
      diskon: { type: Number, default: 0 },
      uangMuka: { type: Number, default: 0 },
      ppn: { type: Number, default: 0 },
    },
  ],
  totalBayar: { type: Number, required: true },
  jadwalPembayaran: {
    type: String,
    enum: ["Tunai", "Debit/Kredit", "Transfer/30 Hari setelah barang diterima"],
  },
});

module.exports = mongoose.model("SalesOrder", SalesOrderSchema);
