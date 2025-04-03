import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI || 'mongodb://mongo:27017/unsplash-images',
  unsplashApiUrl: 'https://api.unsplash.com',
  unsplashAccessKey: '6MN9SBUbARpqqE6l_czGTgDuA1SsUeoK0BoAmLxiwLs',
}; 