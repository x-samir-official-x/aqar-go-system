const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// دي مصفوفة التيم بتاعك بالظبط
const teamUsers = [
    { name: "Samir", email: "samir.sayed@aqar.com", password: "cr7samir", role: "owner" },
    { name: "Zeyad", email: "zeyad.ehap@aqar.com", password: "zeyad1", role: "owner" },
    { name: "rahma", email: "rahma@aqar.com", password: "rahma2", role: "member" },
    { name: "mariam", email: "mariam@aqar.com", password: "mariam2", role: "member" },
    { name: "radwa", email: "radwa@aqar.com", password: "radwa2", role: "member" },
    { name: "christine", email: "christine@aqar.com", password: "christine2", role: "member" }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to DB for seeding...');
        
        // مسح كل البيانات القديمة عشان ميحصلش تكرار
        await User.deleteMany({});

        // إدخال التيم كله مرة واحدة لقاعدة البيانات
        await User.insertMany(teamUsers);
        
        console.log('🎉 All team members added to MongoDB successfully!');
        
        // قفل الاتصال بعد الانتهاء
        mongoose.connection.close();
    })
    .catch(err => console.log(err));