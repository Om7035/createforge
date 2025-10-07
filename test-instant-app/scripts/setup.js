const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Simple in-memory database for instant setup
const users = [
  {
    id: '1',
    email: 'admin@test.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Admin User',
    role: 'admin',
    plan: 'enterprise',
    createdAt: new Date().toISOString()
  },
  {
    id: '2', 
    email: 'user@test.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Test User',
    role: 'user',
    plan: 'pro',
    createdAt: new Date().toISOString()
  }
];

// Add more realistic users
for (let i = 3; i <= 50; i++) {
  users.push({
    id: i.toString(),
    email: `user${i}@example.com`,
    password: bcrypt.hashSync('password', 10),
    name: `User ${i}`,
    role: 'user',
    plan: ['free', 'pro', 'enterprise'][Math.floor(Math.random() * 3)],
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
  });
}

// Create data directory
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Save users data
fs.writeFileSync(path.join(dataDir, 'users.json'), JSON.stringify(users, null, 2));

// Create payments data
const payments = [];
users.slice(0, 30).forEach(user => {
  const paymentCount = Math.floor(Math.random() * 12) + 1;
  for (let i = 0; i < paymentCount; i++) {
    payments.push({
      id: `${user.id}-${i}`,
      userId: user.id,
      amount: [999, 2999, 9999][Math.floor(Math.random() * 3)],
      status: ['completed', 'failed'][Math.floor(Math.random() * 2)],
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
});

fs.writeFileSync(path.join(dataDir, 'payments.json'), JSON.stringify(payments, null, 2));

console.log('✅ Database setup complete!');
console.log(`✅ Created ${users.length} users`);
console.log(`✅ Created ${payments.length} payments`);
console.log('');
console.log('🔑 Login credentials:');
console.log('👤 Admin: admin@test.com / password');
console.log('👤 User: user@test.com / password');
