import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import authRoutes from './routes/auth/index.js';
import apiRoutes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: process.env.VITE_DEV_ORIGIN,
      credentials: true,
    })
  );
}

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(join(__dirname, 'public')));

  // SPA fallback
  app.get(/^\/(?!api|auth).*/, (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `✅ Server listening on ${process.env.VITE_DEV_ORIGIN || `http://localhost:${PORT}`}`
    );
  } else {
    console.log(`✅ Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  }
});
