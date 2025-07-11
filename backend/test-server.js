const mongoose = require('mongoose');

// Test MongoDB connection
const mongoURI = 'mongodb+srv://shivam:1234@cluster0.0dnrgyi.mongodb.net/';

async function testConnection() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ MongoDB connected successfully');
    
    // Test if we can access the database
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection(); 