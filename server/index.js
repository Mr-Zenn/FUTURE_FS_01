import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/index.js';
import connectDB from './config/db.js';
import logger from './middleware/logger.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import messageRoutes from './routes/message.routes.js';

connectDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => res.json({ success: true, message: 'Portfolio API running' }));

app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

app.use(errorMiddleware);

app.listen(config.port, () => console.log(`Server running on port ${config.port} [${config.nodeEnv}]`));
