import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional, but good for resetting)
  await prisma.campaign.deleteMany();
  await prisma.review.deleteMany();
  await prisma.prompt.deleteMany();
  await prisma.analytics.deleteMany();
  await prisma.competitor.deleteMany();
  await prisma.module.deleteMany();
  await prisma.location.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database cleared.");

  // Create Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: "Acme Agency",
      domain: "app.acme.com",
    }
  });

  // Create Global User
  const user = await prisma.user.create({
    data: {
      email: "admin@acme.com",
      name: "Admin User",
    }
  });

  // Map user to tenant
  await prisma.tenantUser.create({
    data: {
      tenantId: tenant.id,
      userId: user.id,
      role: "OWNER",
    }
  });

  // Create Location
  const location = await prisma.location.create({
    data: {
      tenantId: tenant.id,
      name: "Starbucks Coffee (Downtown)",
      address: "123 Main St",
      placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4", // fake place id
    }
  });

  console.log("Created Tenant and Location:", tenant.id, location.id);

  // Create Campaigns
  await prisma.campaign.create({
    data: {
      tenantId: tenant.id,
      name: "Winter Special Follow-up",
      type: "SMS",
      sent: 450,
      generated: 32,
      status: "Completed",
    }
  });

  await prisma.campaign.create({
    data: {
      tenantId: tenant.id,
      name: "August Leads",
      type: "Email",
      sent: 1200,
      generated: 14,
      status: "Running",
    }
  });

  // Create Analytics
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    await prisma.analytics.create({
      data: {
        locationId: location.id,
        date: d,
        traffic: Math.floor(Math.random() * 50) + 10,
        calls: Math.floor(Math.random() * 10),
        formLeads: Math.floor(Math.random() * 5),
        conversions: Math.floor(Math.random() * 3),
      }
    });
  }

  // Create Modules
  await prisma.module.createMany({
    data: [
      { slug: "mod_dhanda", name: "Dhanda Engine", description: "Advanced local SEO analytics." },
      { slug: "mod_falcon", name: "Local Falcon Sync", description: "Deep integration with Local Falcon API." },
      { slug: "mod_review", name: "ReviewTrackers", description: "Automated review generation." }
    ]
  });

  // Create Reviews
  await prisma.review.create({
    data: {
      locationId: location.id,
      reviewerName: "Sarah Jenkins",
      rating: 5,
      content: "Great plumbing service, came exactly on time.",
      source: "Google"
    }
  });
  
  await prisma.review.create({
    data: {
      locationId: location.id,
      reviewerName: "John Doe",
      rating: 4,
      content: "Good coffee, but long wait times.",
      source: "Yelp"
    }
  });

  // Create Prompts
  await prisma.prompt.create({
    data: {
      tenantId: tenant.id,
      title: "Holiday Promo",
      content: "Write a short GBP post about our new holiday promo: 20% off all services.",
      category: "Promotional"
    }
  });

  // Create Competitors
  await prisma.competitor.create({
    data: {
      locationId: location.id,
      name: "Joe's Emergency Plumbing",
      address: "0.8 miles away",
      avgRank: 1
    }
  });

  await prisma.competitor.create({
    data: {
      locationId: location.id,
      name: "Downtown Rooter",
      address: "1.2 miles away",
      avgRank: 4
    }
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
