/**
 * Forge Seeds — Realistic Demo Data
 * 
 * This script creates multiple demo scenarios:
 * 1. Trial user (14 days remaining)
 * 2. Paid customer (Pro plan)
 * 3. Payment failed (action required)
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding demo data...\n');

  // Clear existing data
  await prisma.subscription.deleteMany();
  await prisma.user.deleteMany();

  // Scenario 1: Trial User
  const trialUser = await prisma.user.create({
    data: {
      email: 'trial@example.com',
      name: 'Trial User',
      clerkId: 'user_trial_demo',
      subscription: {
        create: {
          status: 'trialing',
          plan: 'free',
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
        },
      },
    },
  });

  console.log('✓ Created trial user:', trialUser.email);

  // Scenario 2: Paid Customer
  const paidUser = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      name: 'Pro Customer',
      clerkId: 'user_paid_demo',
      subscription: {
        create: {
          status: 'active',
          plan: 'pro',
          stripeCustomerId: 'cus_demo_pro',
          stripeSubscriptionId: 'sub_demo_pro',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      },
    },
  });

  console.log('✓ Created paid customer:', paidUser.email);

  // Scenario 3: Payment Failed
  const failedUser = await prisma.user.create({
    data: {
      email: 'failed@example.com',
      name: 'Failed Payment',
      clerkId: 'user_failed_demo',
      subscription: {
        create: {
          status: 'past_due',
          plan: 'pro',
          stripeCustomerId: 'cus_demo_failed',
          stripeSubscriptionId: 'sub_demo_failed',
          currentPeriodEnd: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        },
      },
    },
  });

  console.log('✓ Created failed payment user:', failedUser.email);

  // Scenario 4: Enterprise Customer
  const enterpriseUser = await prisma.user.create({
    data: {
      email: 'enterprise@example.com',
      name: 'Enterprise Admin',
      clerkId: 'user_enterprise_demo',
      subscription: {
        create: {
          status: 'active',
          plan: 'enterprise',
          stripeCustomerId: 'cus_demo_enterprise',
          stripeSubscriptionId: 'sub_demo_enterprise',
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        },
      },
    },
  });

  console.log('✓ Created enterprise customer:', enterpriseUser.email);

  console.log('\n🎉 Demo data seeded successfully!\n');
  console.log('Demo scenarios:');
  console.log('  1. Trial user (14 days left)');
  console.log('  2. Paid customer (Pro plan)');
  console.log('  3. Payment failed (action required)');
  console.log('  4. Enterprise customer (annual)');
  console.log('\nYou can now test different user flows!\n');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
