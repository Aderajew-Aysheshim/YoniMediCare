const fs = require('fs');
const path = require('path');

// Create .env file from .env.example
const setupEnv = () => {
  const envExamplePath = path.join(__dirname, '.env.example');
  const envPath = path.join(__dirname, '.env');

  if (!fs.existsSync(envPath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
    console.log('📝 Please edit .env file with your MongoDB connection string');
    console.log('🔑 Set a secure JWT_SECRET value');
  } else {
    console.log('✅ .env file already exists');
  }
};

setupEnv();
