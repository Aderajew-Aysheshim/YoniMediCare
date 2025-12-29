const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const User = require("./models/User");
const Medicine = require("./models/Medicine");
const Order = require("./models/Order");

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
  {
    name: "Insulin Pen",
    description: "Advanced insulin delivery system with precision dosing and memory function. Compatible with rapid-acting and long-acting insulin formulations.",
    category: "Diabetes",
    price: 2500,
    stock: 30,
    manufacturer: "DiaCare Solutions",
    image: "https://images.unsplash.com/photo-1559757148-5f350a6ee3c6",
    dosage: "As prescribed by healthcare provider.",
    sideEffects: "Hypoglycemia, injection site reactions.",
    requiresPrescription: true,
  },
  {
    name: "Antibiotic Ointment",
    description: "Broad-spectrum topical antibiotic for preventing and treating bacterial skin infections. Effective against gram-positive and gram-negative organisms.",
    category: "Skin Care",
    price: 75,
    stock: 350,
    manufacturer: "DermGuard Labs",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    dosage: "Apply to affected area 2-3 times daily.",
    sideEffects: "Rare: allergic reactions.",
    requiresPrescription: true,
  },
  {
    name: "Allergy Tablets",
    description: "24-hour relief from seasonal allergies, hay fever, and allergic rhinitis. Non-drowsy formula with loratadine for daytime comfort.",
    category: "Vitamins",
    price: 45,
    stock: 800,
    manufacturer: "AllerClear Pharma",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
    dosage: "One tablet daily.",
    sideEffects: "Rare: headache or dry mouth.",
    requiresPrescription: false,
  }
];

// Generate sample orders for admin demo
const generateSampleOrders = async (users, medicines) => {
  const orders = [];
  const statuses = ['pending', 'processing', 'shipped', 'delivered'];
  const paymentMethods = ['telebirr', 'card', 'cash'];

  // Create orders for different users
  for (let i = 0; i < 15; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const numItems = Math.floor(Math.random() * 3) + 1;
    const selectedMedicines = [];

    for (let j = 0; j < numItems; j++) {
      const medicine = medicines[Math.floor(Math.random() * medicines.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      selectedMedicines.push({
        medicine: medicine._id,
        quantity,
        price: medicine.price
      });
    }

    const totalAmount = selectedMedicines.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    orders.push({
      user: user._id,
      items: selectedMedicines,
      totalAmount,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      payment: {
        confirmed: Math.random() > 0.3,
        method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        transactionId: Math.random() > 0.7 ? `TXN${Date.now()}` : null
      },
      deliveryAddress: {
        street: `${Math.floor(Math.random() * 999) + 1} Demo Street`,
        city: "Addis Ababa",
        state: "Addis Ababa",
        zipCode: `${Math.floor(Math.random() * 900) + 1000}`,
        phone: user.phone
      },
      prescriptionImage: Math.random() > 0.5 ? `/uploads/prescriptions/prescription_${i}.jpg` : null,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    });
  }

  return orders;
};

const seedDatabase = async () => {
  try {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");

    console.log("🗑️  Deleting existing data...");
    await User.deleteMany({});
    await Medicine.deleteMany({});
    await Order.deleteMany({});

    console.log("💊 Seeding medicines...");
    const seededMedicines = await Medicine.insertMany(medicines);
    console.log(`✅ ${medicines.length} Medicines seeded successfully`);

    console.log("👥 Seeding users...");
    const seededUsers = await User.create([
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
        name: "Pharmacy Manager",
        email: "pharmacy@yonimedicare.com",
        password: "pharmacy123",
        phone: "+251 911 333 333",
        address: {
          street: "789 Pharmacy Road",
          city: "Addis Ababa",
          state: "Addis Ababa",
          zipCode: "1002",
        },
        role: "user",
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
      },
      {
        name: "Sarah Johnson",
        email: "sarah@demo.com",
        password: "sarah123",
        phone: "+251 911 444 444",
        address: {
          street: "321 Customer Lane",
          city: "Addis Ababa",
          state: "Addis Ababa",
          zipCode: "1003",
        },
        role: "user",
      },
      {
        name: "Michael Brown",
        email: "michael@demo.com",
        password: "michael123",
        phone: "+251 911 555 555",
        address: {
          street: "654 Client Road",
          city: "Addis Ababa",
          state: "Addis Ababa",
          zipCode: "1004",
        },
        role: "user",
      }
    ]);
    console.log(`✅ ${seededUsers.length} Users seeded successfully`);

    console.log("📦 Creating sample orders...");
    const sampleOrders = await generateSampleOrders(seededUsers, seededMedicines);
    await Order.insertMany(sampleOrders);
    console.log(`✅ ${sampleOrders.length} Sample orders created`);

    console.log("\n🎉 Database Seeded Successfully!");
    console.log("\n🔐 Demo Credentials:");
    console.log("   📧 Admin: admin@yonimedicare.com / admin123");
    console.log("   🏥 Pharmacy: pharmacy@yonimedicare.com / pharmacy123");
    console.log("   👤 User: user@example.com / user123");
    console.log("   👤 Demo: sarah@demo.com / sarah123");
    console.log("   👤 Demo: michael@demo.com / michael123");

    console.log("\n📊 Demo Data Summary:");
    console.log(`   💊 Medicines: ${seededMedicines.length} items`);
    console.log(`   👥 Users: ${seededUsers.length} accounts`);
    console.log(`   📦 Orders: ${sampleOrders.length} orders`);
    console.log(`   💰 Total Revenue: ETB ${sampleOrders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ SEED ERROR:", error.message);
    if (error.errors) {
      console.error("❌ VALIDATION ERRORS:", Object.keys(error.errors).map(key => `${key}: ${error.errors[key].message}`));
    }
    process.exit(1);
  }
};

seedDatabase();
