const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const User = require("./models/User");
const Medicine = require("./models/Medicine");

const medicines = [
  {
    name: "Paracetamol 500mg",
    description: "Fast-acting analgesic and antipyretic. Essential for fever reduction and effective relief of mild to moderate pain including headaches, muscle aches, and common cold symptoms.",
    category: "Pain Relief",
    price: 30,
    stock: 500,
    manufacturer: "EthioPharma Labs",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
    dosage: "1-2 tablets every 6 hours as needed.",
    sideEffects: "Rare: nausea, skin rash, or allergic reactions.",
    requiresPrescription: false,
  },
  {
    name: "Amoxicillin Capsules",
    description: "Broad-spectrum penicillin antibiotic used to treat various bacterial infections, including respiratory tract, ear, and skin infections. High clinical efficacy profile.",
    category: "Antibiotics",
    price: 120,
    stock: 250,
    manufacturer: "Global Meds Corp",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
    dosage: "One capsule three times daily for 7-10 days.",
    sideEffects: "Nausea, diarrhea, or mild stomach discomfort.",
    requiresPrescription: true,
  },
  {
    name: "Vitamin C Tablets",
    description: "High-potency Ascorbic Acid for immune system reinforcement and antioxidant protection. Promotes healthy skin, bone density, and iron absorption.",
    category: "Vitamins",
    price: 80,
    stock: 1000,
    manufacturer: "PureHealth Nutrition",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2",
    dosage: "One tablet daily with water.",
    sideEffects: "Minimal: Large doses may cause digestive upset.",
    requiresPrescription: false,
  },
  {
    name: "Cough Syrup",
    description: "Advanced expectorant formula designed to clear bronchial pathways and soothe irritated throat membranes. Non-drowsy relief for persistent chesty coughs.",
    category: "Cold & Flu",
    price: 65,
    stock: 300,
    manufacturer: "ClearAir Pharamceuticals",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f",
    dosage: "10ml every 8 hours.",
    sideEffects: "None reported at therapeutic levels.",
    requiresPrescription: false,
  },
  {
    name: "Antacid Syrup",
    description: "Rapid neutralized action for gastric acidity and heartburn relief. Forms a protective barrier over the stomach lining for long-lasting comfort.",
    category: "Digestive Health",
    price: 90,
    stock: 450,
    manufacturer: "GastroGuard Inc",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267b9",
    dosage: "5-10ml after meals and at bedtime.",
    sideEffects: "Possible mild constipation or diarrhea.",
    requiresPrescription: false,
  },
  {
    name: "Blood Pressure Monitor",
    description: "Professional-grade digital sphygmomanometer with institutional accuracy. Features irregular heartbeat detection and multi-user memory storage.",
    category: "Heart Health",
    price: 1500,
    stock: 50,
    manufacturer: "Precision Diagnostics",
    image: "https://images.unsplash.com/photo-1580281657527-47c48d1c07dd",
    dosage: "Use twice daily for trend monitoring.",
    sideEffects: "None.",
    requiresPrescription: false,
  },
  {
    name: "Glucometer",
    description: "Institutional-standard blood glucose monitoring system. Provides 5-second results with minimal blood sample required. Bluetooth-sync capable.",
    category: "Diabetes",
    price: 1100,
    stock: 65,
    manufacturer: "LifeLink Biotech",
    image: "https://images.unsplash.com/photo-1582719478170-2f08d4fbcf06",
    dosage: "Monitor as advised by clinical professional.",
    sideEffects: "None.",
    requiresPrescription: false,
  },
  {
    name: "Skin Ointment",
    description: "Triple-action dermatological ointment for localized skin infections and inflammatory conditions. Clinical-grade moisturizing and healing barrier.",
    category: "Skin Care",
    price: 55,
    stock: 400,
    manufacturer: "DermaElite Labs",
    image: "https://images.unsplash.com/photo-1598514983318-2f6c28b8e6f0",
    dosage: "Apply thin layer to affected area twice daily.",
    sideEffects: "Rare: Localized skin irritation.",
    requiresPrescription: false,
  },
  {
    name: "First Aid Kit",
    description: "Total trauma management system. Contains 120 essential clinical pieces including sterile gauze, trauma shears, and specialized antiseptic agents.",
    category: "First Aid",
    price: 500,
    stock: 120,
    manufacturer: "SafeStep Medical",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
    dosage: "Follow contained protocol manual for triage.",
    sideEffects: "None.",
    requiresPrescription: false,
  },
  {
    name: "Medical Gloves",
    description: "Powder-free, nitrile clinical examination discovered gloves. High tactile sensitivity with superior chemical and puncture resistance. Pack of 100.",
    category: "Other",
    price: 40,
    stock: 2000,
    manufacturer: "BarrierPro Health",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
    dosage: "Single use only per patient contact.",
    sideEffects: "None reported.",
    requiresPrescription: false,
  },
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");

    console.log("Deleting existing users...");
    await User.deleteMany({});

    console.log("Deleting existing medicines...");
    await Medicine.deleteMany({});

    console.log("Seeding medicines...");
    await Medicine.insertMany(medicines);
    console.log(`${medicines.length} Medicines seeded successfully`);

    // Only create users if everything else worked
    console.log("Seeding users...");
    await User.create([
      {
        name: "Admin User",
        email: "admin@yonimedicare.com",
        password: "admin123",
        phone: "+251 911 111 111",
        address: {
          street: "123 Admin Street",
          city: "Addis Ababa",
          state: "Addis Ababa",
          zipCode: "1000",
        },
        role: "admin",
      },
      {
        name: "John Doe",
        email: "user@example.com",
        password: "user123",
        phone: "+251 911 222 222",
        address: {
          street: "456 User Avenue",
          city: "Addis Ababa",
          state: "Addis Ababa",
          zipCode: "1001",
        },
        role: "user",
      }
    ]);
    console.log("Users seeded successfully");

    console.log("Database Seeded Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("SEED ERROR:", error.message);
    if (error.errors) {
      console.error("VALIDATION ERRORS:", Object.keys(error.errors).map(key => `${key}: ${error.errors[key].message}`));
    }
    process.exit(1);
  }
};

seedDatabase();
