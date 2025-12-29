const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

const log = (color, message) => {
    console.log(`${color}${message}${colors.reset}`);
};

// Check if .env exists, create from .env.example if not
const setupEnv = () => {
    const envExamplePath = path.join(__dirname, '.env.example');
    const envPath = path.join(__dirname, '.env');

    if (!fs.existsSync(envPath)) {
        fs.copyFileSync(envExamplePath, envPath);
        log(colors.green, '✅ Created .env file from .env.example');
        log(colors.yellow, '⚠️  Please edit .env with your MongoDB connection string');
        log(colors.yellow, '⚠️  Set a secure JWT_SECRET value');
    } else {
        log(colors.green, '✅ .env file already exists');
    }
};

// Run a command and return a promise
const runCommand = (command, args, cwd) => {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            cwd,
            stdio: 'inherit',
            shell: true
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve(code);
            } else {
                reject(new Error(`Command failed with code ${code}`));
            }
        });

        child.on('error', (error) => {
            reject(error);
        });
    });
};

// Main startup function
const startDev = async() => {
    try {
        log(colors.blue, '🚀 Starting YoniMediCare Development Setup...\n');

        // Step 1: Setup environment
        log(colors.blue, '📋 Step 1: Setting up environment...');
        setupEnv();

        // Step 2: Install dependencies if needed
        log(colors.blue, '\n📦 Step 2: Checking dependencies...');
        try {
            await runCommand('npm', ['install'], __dirname);
            log(colors.green, '✅ Dependencies installed');
        } catch (error) {
            log(colors.red, '❌ Failed to install dependencies');
            throw error;
        }

        // Step 3: Seed database
        log(colors.blue, '\n🌱 Step 3: Seeding database...');
        try {
            await runCommand('npm', ['run', 'seed'], __dirname);
            log(colors.green, '✅ Database seeded successfully');
        } catch (error) {
            log(colors.red, '❌ Failed to seed database');
            log(colors.yellow, '⚠️  Make sure MongoDB is running!');
            throw error;
        }

        // Step 4: Start development server
        log(colors.blue, '\n🔥 Step 4: Starting development server...');
        log(colors.green, '✅ Server starting on http://localhost:5000');
        log(colors.green, '✅ API available at https://yonimedicare.onrender.com/api');
        log(colors.blue, '\n🔐 Demo Credentials:');
        log(colors.yellow, '   Admin: admin@yonimedicare.com / admin123');
        log(colors.yellow, '   Pharmacy: pharmacy@yonimedicare.com / pharmacy123');
        log(colors.yellow, '   User: user@example.com / user123');
        log(colors.blue, '\n🌐 Frontend should run on http://localhost:5173');
        log(colors.blue, '📱 Login at http://localhost:5173/login');

        await runCommand('npm', ['run', 'dev'], __dirname);

    } catch (error) {
        log(colors.red, `\n❌ Setup failed: ${error.message}`);
        log(colors.yellow, '\n🔧 Troubleshooting:');
        log(colors.yellow, '   1. Make sure MongoDB is installed and running');
        log(colors.yellow, '   2. Check your .env file MongoDB connection string');
        log(colors.yellow, '   3. Install Node.js dependencies: npm install');
        process.exit(1);
    }
};

// Run the setup
startDev();