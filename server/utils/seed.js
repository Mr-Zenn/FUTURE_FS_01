import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Project from '../models/Project.js';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany({});
  await Project.deleteMany({});

  await User.create({
    name: 'Admin',
    email: 'admin@portfolio.com',
    password: 'admin123',
    role: 'admin',
  });

  await Project.insertMany([
    {
      title: 'CRM System',
      description: 'A full-featured Customer Relationship Management system with lead tracking, pipeline management, and analytics dashboard.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Chart.js'],
      githubLink: 'https://github.com/yourusername/crm-system',
      liveLink: 'https://crm-demo.vercel.app',
      category: 'Full Stack',
      image: '',
    },
    {
      title: "Restaurant Reservation System (Lumière)",
      description: 'An elegant reservation platform for fine dining restaurant Lumière, featuring real-time table booking, guest management, and automated email confirmations.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Nodemailer'],
      githubLink: 'https://github.com/yourusername/lumiere-reservations',
      liveLink: 'https://lumiere-demo.vercel.app',
      category: 'Full Stack',
      image: '',
    },
  ]);

  console.log('Seeded: 1 admin user + 2 projects');
  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });
