const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Mengimpor fungsi koneksi database
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Baca variabel dari .env
const NODE_ENV = process.env.NODE_ENV;
const URL_DEV = process.env.URL_DEV;
const URL_PRODUCTION = process.env.URL_PRODUCTION;

const serverUrl = NODE_ENV === 'development' ? URL_DEV : URL_PRODUCTION;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Widya Project API',
      version: '1.0.0',
      description: 'Full Stack Engineer Knowledge Test API'
    },
    servers: [
      {
        url: serverUrl
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js'] // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Koneksi Database
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
// const profileRoutes = require('./routes/profileRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/profile', profileRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

// index Hello World
app.get('/', (req, res) => {
  res.send('Hello World!');
  // res.send('Welcome to the Widya Project API!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
