const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Product } = require('./models/productModel.js');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Atlas connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const seedProducts = async () => {
  await connectDB();

  await Product.deleteMany({});

  const products = [
    {
      name: 'GlowAura Face Serum',
      description: 'Hydrating and brightening serum for radiant skin.',
      price: 29.99,
      image: 'https://picsum.photos/200?random=11',
      stock: 50,
      productNumber: 'B001',
    },
    {
      name: 'VelvetGlow Lip Balm',
      description: 'Smooth lip balm infused with shea butter.',
      price: 9.99,
      image: 'https://picsum.photos/200?random=12',
      stock: 80,
      productNumber: 'B002',
    },
    {
      name: 'LushGlam Foundation',
      description: 'Lightweight foundation with buildable coverage.',
      price: 24.99,
      image: 'https://picsum.photos/200?random=13',
      stock: 40,
      productNumber: 'B003',
    },
    {
      name: 'BlossomBeauty Shampoo',
      description: 'Gentle shampoo for smooth and shiny hair.',
      price: 15.99,
      image: 'https://picsum.photos/200?random=14',
      stock: 35,
      productNumber: 'B004',
    },
    {
      name: 'PureElegance Night Cream',
      description: 'Nourishing night cream for overnight hydration.',
      price: 32.99,
      image: 'https://picsum.photos/200?random=15',
      stock: 25,
      productNumber: 'B005',
    },
    {
      name: 'RadiantBloom Blush',
      description: 'Soft blush for a natural flush of color.',
      price: 12.99,
      image: 'https://picsum.photos/200?random=16',
      stock: 45,
      productNumber: 'B006',
    },
    {
      name: 'SilkSerenity Hair Oil',
      description: 'Lightweight oil for silky, frizz-free hair.',
      price: 18.99,
      image: 'https://picsum.photos/200?random=17',
      stock: 30,
      productNumber: 'B007',
    },
    {
      name: 'LuxeGlow Highlighter',
      description: 'High-impact shimmer for a dewy glow.',
      price: 19.99,
      image: 'https://picsum.photos/200?random=18',
      stock: 28,
      productNumber: 'B008',
    },
    {
      name: 'GleamSkin Cleanser',
      description: 'Gentle foaming cleanser for daily use.',
      price: 14.99,
      image: 'https://picsum.photos/200?random=19',
      stock: 60,
      productNumber: 'B009',
    },
    {
      name: 'VividBloom Mascara',
      description: 'Volumizing mascara for dramatic lashes.',
      price: 17.99,
      image: 'https://picsum.photos/200?random=20',
      stock: 33,
      productNumber: 'B010',
    },
    {
      name: 'GlowDew Toner',
      description: 'Refreshing toner to refine and hydrate skin.',
      price: 13.99,
      image: 'https://picsum.photos/200?random=21',
      stock: 38,
      productNumber: 'B011',
    },
    {
      name: 'EnchantedLuxe Perfume',
      description: 'Floral fragrance with a hint of musk.',
      price: 49.99,
      image: 'https://picsum.photos/200?random=22',
      stock: 20,
      productNumber: 'B012',
    },
  ];

  await Product.insertMany(products);
  console.log('✅ Beauty products seeded to MongoDB Atlas!');
  process.exit();
};

seedProducts();
