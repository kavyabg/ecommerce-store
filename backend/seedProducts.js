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
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with USB receiver.',
      price: 29.99,
      image: 'https://picsum.photos/200?random=1',
      stock: 50,
    },
    {
      name: 'Mechanical Keyboard',
      description: 'RGB backlit mechanical keyboard with blue switches.',
      price: 69.99,
      image: 'https://picsum.photos/200?random=2',
      stock: 30,
    },
    {
      name: 'Gaming Headset',
      description: 'Surround sound gaming headset with mic.',
      price: 49.99,
      image: 'https://picsum.photos/200?random=3',
      stock: 20,
    },
    {
      name: 'Webcam HD',
      description: '1080p HD webcam with built-in microphone.',
      price: 39.99,
      image: 'https://picsum.photos/200?random=4',
      stock: 25,
    },
    {
      name: 'USB-C Hub',
      description: '6-in-1 USB-C hub with HDMI, USB, SD slots.',
      price: 34.99,
      image: 'https://picsum.photos/200?random=5',
      stock: 40,
    },
    {
      name: 'Laptop Stand',
      description: 'Adjustable aluminum laptop stand.',
      price: 24.99,
      image: 'https://picsum.photos/200?random=6',
      stock: 35,
    },
    {
      name: 'External SSD',
      description: '1TB portable external SSD with fast transfer speeds.',
      price: 119.99,
      image: 'https://picsum.photos/200?random=7',
      stock: 15,
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable waterproof Bluetooth speaker.',
      price: 44.99,
      image: 'https://picsum.photos/200?random=8',
      stock: 22,
    },
    {
      name: 'Smartphone Charger',
      description: 'Fast-charging USB-C charger for smartphones.',
      price: 14.99,
      image: 'https://picsum.photos/200?random=9',
      stock: 60,
    },
    {
      name: 'Wireless Earbuds',
      description: 'Noise-cancelling true wireless earbuds.',
      price: 59.99,
      image: 'https://picsum.photos/200?random=10',
      stock: 18,
    },
  ];

  await Product.insertMany(products);
  console.log('✅ Products seeded to MongoDB Atlas!');
  process.exit();
};

seedProducts();
