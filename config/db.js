const mongoose = require('mongoose');

// Fungsi untuk menghubungkan ke MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Keluar jika koneksi gagal
  }
};

module.exports = connectDB;
