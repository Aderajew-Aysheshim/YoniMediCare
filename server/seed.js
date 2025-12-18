const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./models/User");
const Medicine = require("./models/Medicine");

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Clear existing data
    await User.deleteMany({});
    await Medicine.deleteMany({});

    console.log("Cleared existing data");

    // Create admin user
    const admin = await User.create({
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
    });

    // Create regular user
    const user = await User.create({
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
    });

    console.log("Created users");

    // Create sample medicines
    const medicines = [
      {
        name: "Paracetamol 500mg",
        description: "Effective pain relief and fever reducer. Suitable for headaches, muscle aches, and cold symptoms.",
        category: "Pain Relief",
        price: 5.99,
        stock: 100,
        manufacturer: "PharmaCorp",
        dosage: "1-2 tablets every 4-6 hours",
        sideEffects: "Rare: nausea, allergic reactions",
        requiresPrescription: false,
      },
      {
        name: "Amoxicillin 500mg",
        description: "Broad-spectrum antibiotic for bacterial infections. Treats respiratory, ear, and urinary tract infections.",
        category: "Antibiotics",
        price: 12.99,
        stock: 50,
        manufacturer: "MediPharm",
        dosage: "1 capsule 3 times daily",
        sideEffects: "Diarrhea, nausea, skin rash",
        requiresPrescription: true,
      },
      {
        name: "Vitamin C 1000mg",
        description: "Immune system support and antioxidant. Helps with wound healing and iron absorption.",
        category: "Vitamins",
        price: 8.99,
        stock: 150,
        manufacturer: "HealthPlus",
        dosage: "1 tablet daily",
        sideEffects: "Rare: upset stomach at high doses",
        requiresPrescription: false,
      },
      {
        name: "Ibuprofen 400mg",
        description: "Anti-inflammatory pain reliever. Effective for arthritis, menstrual cramps, and muscle pain.",
        category: "Pain Relief",
        price: 7.49,
        stock: 80,
        manufacturer: "PharmaCorp",
        dosage: "1 tablet every 6-8 hours",
        sideEffects: "Stomach upset, dizziness",
        requiresPrescription: false,
      },
      {
        name: "Cetirizine 10mg",
        description: "Antihistamine for allergy relief. Treats hay fever, hives, and allergic reactions.",
        category: "Cold & Flu",
        price: 6.99,
        stock: 120,
        manufacturer: "AllergyFree",
        dosage: "1 tablet once daily",
        sideEffects: "Drowsiness, dry mouth",
        requiresPrescription: false,
      },
      {
        name: "Omeprazole 20mg",
        description: "Proton pump inhibitor for acid reflux and heartburn. Reduces stomach acid production.",
        category: "Digestive Health",
        price: 11.99,
        stock: 60,
        manufacturer: "DigestCare",
        dosage: "1 capsule before breakfast",
        sideEffects: "Headache, nausea, diarrhea",
        requiresPrescription: true,
      },
      {
        name: "Metformin 500mg",
        description: "First-line treatment for type 2 diabetes. Helps control blood sugar levels.",
        category: "Diabetes",
        price: 9.99,
        stock: 70,
        manufacturer: "DiabetesCare",
        dosage: "1 tablet twice daily with meals",
        sideEffects: "Nausea, diarrhea, stomach upset",
        requiresPrescription: true,
      },
      {
        name: "Aspirin 75mg",
        description: "Low-dose aspirin for heart health. Prevents blood clots and reduces heart attack risk.",
        category: "Heart Health",
        price: 4.99,
        stock: 200,
        manufacturer: "CardioHealth",
        dosage: "1 tablet once daily",
        sideEffects: "Stomach irritation, bleeding risk",
        requiresPrescription: false,
      },
      {
        name: "Multivitamin Complex",
        description: "Complete daily vitamin and mineral supplement. Supports overall health and wellbeing.",
        category: "Vitamins",
        price: 14.99,
        stock: 90,
        manufacturer: "HealthPlus",
        dosage: "1 tablet daily with food",
        sideEffects: "Rare: upset stomach",
        requiresPrescription: false,
      },
      {
        name: "Hydrocortisone Cream 1%",
        description: "Topical steroid for skin inflammation. Treats eczema, dermatitis, and insect bites.",
        category: "Skin Care",
        price: 8.49,
        stock: 45,
        manufacturer: "DermaCare",
        dosage: "Apply thin layer 2-3 times daily",
        sideEffects: "Skin thinning with prolonged use",
        requiresPrescription: false,
      },
      {
        name: "Bandages Assorted Pack",
        description: "Sterile adhesive bandages in various sizes. Essential for minor cuts and wounds.",
        category: "First Aid",
        price: 3.99,
        stock: 300,
        manufacturer: "FirstAid Pro",
        dosage: "Apply to clean, dry wound",
        sideEffects: "None",
        requiresPrescription: false,
      },
      {
        name: "Ciprofloxacin 500mg",
        description: "Fluoroquinolone antibiotic for serious bacterial infections. Treats urinary and respiratory infections.",
        category: "Antibiotics",
        price: 15.99,
        stock: 40,
        manufacturer: "MediPharm",
        dosage: "1 tablet twice daily",
        sideEffects: "Nausea, diarrhea, dizziness",
        requiresPrescription: true,
      },
    ];

    await Medicine.insertMany(medicines);

    console.log("Created sample medicines");
    console.log("\n=== Seed Data Summary ===");
    console.log(`Admin User: admin@yonimedicare.com / admin123`);
    console.log(`Regular User: user@example.com / user123`);
    console.log(`Total Medicines: ${medicines.length}`);
    console.log("========================\n");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
