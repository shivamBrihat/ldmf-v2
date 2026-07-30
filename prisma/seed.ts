import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with full multi-page content...');

  // 0. Admin User
  await prisma.user.deleteMany();
  const hashedPassword = bcrypt.hashSync('Admin@123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@brihatinfotech.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  });

  // 1. Team Members
  await prisma.teamMember.deleteMany();
  await prisma.teamMember.createMany({
    data: [
      {
        name: 'Vipul Chauhan',
        role: 'Founder & Managing Trustee',
        designation: 'Founder & Managing Trustee',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
        bio: 'Retired educationist & social advocate with 35+ years of community leadership in UP.',
        linkedinUrl: 'https://linkedin.com/in/vipul-chauhan',
        email: 'vipul@ldmf.org',
        order: 1,
      },
      {
        name: 'Anjali Chauhan',
        role: 'Co-Trustee & Director of Education',
        designation: 'Co-Trustee & Director of Education',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
        bio: 'Dedicated rural development strategist specializing in women economic empowerment.',
        linkedinUrl: 'https://linkedin.com/in/anjali-chauhan',
        email: 'anjali@ldmf.org',
        order: 2,
      },
      {
        name: 'Dr. Ramesh Chandra',
        role: 'Chief Medical Coordinator',
        designation: 'Chief Medical Coordinator',
        photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop',
        bio: 'Financial consultant overseeing transparent 80G governance and donor accountability.',
        linkedinUrl: 'https://linkedin.com/in/ramesh-chandra',
        email: 'ramesh@ldmf.org',
        order: 3,
      },
      {
        name: 'Sunita Sharma',
        role: 'Women Empowerment Lead',
        designation: 'Women Empowerment Lead',
        photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
        bio: 'Former university lecturer driving free computer literacy & coaching programs.',
        linkedinUrl: 'https://linkedin.com/in/sunita-sharma',
        email: 'sunita@ldmf.org',
        order: 4,
      },
    ],
  });

  // 2. Programs / Courses
  await prisma.program.deleteMany();
  await prisma.program.createMany({
    data: [
      {
        title: 'Basic Computer Skills & Digital Literacy',
        description: 'Comprehensive 3-month course covering Windows, MS Office, Internet browsing, online banking, and basic typing for rural youth.',
        imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
        order: 1,
      },
      {
        title: 'Spoken English & Communication',
        description: 'Fluency, vocabulary, public speaking, and confidence-building workshops designed for students preparing for higher education and interviews.',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
        order: 2,
      },
      {
        title: 'Women’s Vocational Tailoring & Handicrafts',
        description: 'Hands-on tailoring, embroidery, and handicrafts training equipped with sewing machines to help women earn a sustainable livelihood.',
        imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
        order: 3,
      },
      {
        title: 'Board Exam Intensive Coaching Camps',
        description: 'Free tuition and mentoring in Mathematics, Science, and English for Class 10 & 12 state board students from underprivileged backgrounds.',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
        order: 4,
      },
    ],
  });

  // 3. Timeline Events
  await prisma.timelineEvent.deleteMany();
  await prisma.timelineEvent.createMany({
    data: [
      {
        year: '2020',
        title: 'Foundation Registered',
        badge: '2020',
        description: 'Foundation established in memory of Smt. Lagni Devi to honor her lifelong dedication to rural welfare.',
        order: 1,
      },
      {
        year: '2021',
        title: 'First Free Education Camp',
        badge: '50 STUDENTS',
        description: 'Launched first Free Computer Training Center in Village Rampur, Azamgarh, benefiting 120 initial students.',
        order: 2,
      },
      {
        year: '2022',
        title: 'Rural Healthcare Camps',
        badge: '15 CAMPS',
        description: 'Expanded to healthcare camps, conducting 15 rural medical drives across Azamgarh and Mau districts.',
        order: 3,
      },
      {
        year: '2023',
        title: 'Women’s Vocational Skills Center',
        badge: '50+ MACHINES',
        description: 'Initiated Women’s Vocational Skill Center, distributing 50+ sewing machines and enabling self-employment.',
        order: 4,
      },
      {
        year: '2024',
        title: '1,500+ Lives Impacted',
        badge: 'MILESTONE',
        description: 'Reached milestone of 1,500+ lives impacted across education, healthcare, and community relief in Eastern UP.',
        order: 5,
      },
    ],
  });

  // 4. Gallery Images
  await prisma.galleryImage.deleteMany();
  await prisma.galleryImage.createMany({
    data: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
        caption: 'Students at the Azamgarh Computer Learning Center',
        category: 'Education',
        order: 1,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
        caption: 'Free Eye & Health Checkup Camp in Mau District',
        category: 'Health Camps',
        order: 2,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
        caption: 'Women Tailoring & Vocational Skill Workshop',
        category: 'Women Empowerment',
        order: 3,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
        caption: 'Village Hygiene Kit Distribution Drive',
        category: 'Events',
        order: 4,
      },
    ],
  });

  // 5. Success Stories
  await prisma.successStory.deleteMany();
  await prisma.successStory.createMany({
    data: [
      {
        personName: 'Pooja Verma',
        location: 'Rampur Village, Azamgarh',
        story: 'After completing the 3-month Computer Course at LDMF, Pooja secured a job as a data entry operator in Azamgarh town, becoming the first earning member in her family.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
        order: 1,
      },
      {
        personName: 'Rohan Kumar',
        location: 'Mau District',
        story: 'Rohan scored 88% in his Class 10 Board Exams after attending LDMF’s 4-month intensive coaching camp, paving his way for higher secondary science education.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        order: 2,
      },
    ],
  });

  // 6. Media Coverage
  await prisma.mediaCoverage.deleteMany();
  await prisma.mediaCoverage.createMany({
    data: [
      {
        outlet: 'Dainik Jagran',
        headline: 'Lagni Devi Memorial Foundation Distributes Free Computer Kits to Rural Youth',
        articleUrl: '#',
        excerpt: 'Dainik Jagran highlighted the success of a free education camp that supported over 200 students in Azamgarh.',
        badge: 'NEWS COVERAGE',
        date: '2024 Coverage',
      },
      {
        outlet: 'Amar Ujala',
        headline: '150 Patients Benefited from Specialist Medical Camp in Azamgarh',
        articleUrl: '#',
        excerpt: 'Amar Ujala reported on the foundation\'s expansion to ten districts with free programs.',
        badge: 'NEWS COVERAGE',
        date: '2024 Coverage',
      },
    ],
  });

  // 7. Updates (New Model)
  await prisma.update.deleteMany();
  await prisma.update.createMany({
    data: [
      {
        title: 'New Computer Lab Inauguration in Village Rampur',
        content: 'We are thrilled to announce the opening of our upgraded 15-system digital lab equipped with high-speed internet and solar power backup. This facility will allow over 120 rural students every quarter to learn essential IT skills for free.',
        imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop',
        publishedAt: new Date('2024-03-15'),
      },
      {
        title: 'Spring Health & Hygiene Kit Distribution Completed',
        content: 'Our team successfully conducted a comprehensive health and sanitation kit distribution across 5 surrounding villages in Mau district, providing hygiene supplies and clean drinking water purification tablets to 300+ families.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
        publishedAt: new Date('2024-02-28'),
      },
      {
        title: 'Vocational Sewing Machine Handover to 25 Rural Artisans',
        content: 'Under our women empowerment initiative, 25 women who completed our 4-month tailoring certification were gifted brand new sewing machines to help them start home-based stitching businesses.',
        imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop',
        publishedAt: new Date('2024-01-20'),
      },
    ],
  });

  // 8. Activities (New Model)
  await prisma.activity.deleteMany();
  await prisma.activity.createMany({
    data: [
      {
        title: 'Village Sanitation & Cleanliness Drives',
        description: 'Organizing weekly clean-up drives across 8 Gram Panchayats in Azamgarh, promoting waste segregation, clean drainage, and community ownership.',
        imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
        order: 1,
      },
      {
        title: 'Free Specialist Medical & Eye Camps',
        description: 'Bringing visiting doctors, ophthalmologists, and free medicines directly to remote rural areas without nearby hospitals.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
        order: 2,
      },
      {
        title: 'Emergency Drought & Seasonal Relief',
        description: 'Distributing clean water tankers, food rations, and winter blankets to vulnerable agrarian families during climate hardships in Jaunpur & Ballia.',
        imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800&auto=format&fit=crop',
        order: 3,
      },
    ],
  });

  // 9. Events (New Model)
  await prisma.event.deleteMany();
  await prisma.event.createMany({
    data: [
      {
        title: 'Annual Rural Health & Dental Camp 2024',
        description: 'Comprehensive health screening, dental checkups, and free vision glasses distribution by visiting specialists.',
        eventDate: new Date('2024-04-14T10:00:00Z'),
        location: 'Rampur Gram Panchayat Bhavan, Azamgarh',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
        isUpcoming: true,
      },
      {
        title: 'Women Entrepreneurship & Micro-Skills Workshop',
        description: 'Interactive session on financial literacy, micro-savings, and establishing small cottage industry units.',
        eventDate: new Date('2024-05-02T11:00:00Z'),
        location: 'LDMF Vocational Center, Azamgarh',
        imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
        isUpcoming: true,
      },
      {
        title: 'Winter Warmth Blanket & Ration Drive 2023',
        description: 'Distributed 500+ wool blankets and monthly grocery kits to elderly and widow households across 6 villages.',
        eventDate: new Date('2023-12-20T09:30:00Z'),
        location: 'Mau District Field Centers',
        imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
        isUpcoming: false,
      },
    ],
  });

  // 10. Site Content (New Model)
  await prisma.siteContent.deleteMany();
  await prisma.siteContent.createMany({
    data: [
      {
        key: 'terms_and_conditions',
        title: 'Terms & Conditions',
        content: `<h3>1. Introduction</h3>
<p>Welcome to Lagni Devi Memorial Foundation (LDMF). By accessing and using our website, you agree to comply with and be bound by the following terms and conditions governing your interaction with our NGO's digital services.</p>

<h3>2. Use of Website & Services</h3>
<p>All content on this website—including text, graphics, photos, program details, and updates—is provided for informational and non-commercial social impact purposes. Unauthorized copying or redistribution without prior written consent from LDMF is strictly prohibited.</p>

<h3>3. Donations & Tax Deductions</h3>
<p>Donations made to Lagni Devi Memorial Foundation are non-refundable and are utilized directly for community education, healthcare, and welfare initiatives. Eligible donations qualify for tax deductions under Section 80G of the Indian Income Tax Act. Official receipts are issued via email upon successful donation verification.</p>

<h3>4. Volunteer Conduct</h3>
<p>Volunteers participating in LDMF field programs are expected to adhere to principles of dignity, respect, non-discrimination, and ethical service towards community members.</p>

<h3>5. Governing Law</h3>
<p>These terms shall be governed by and construed in accordance with the laws of India, with exclusive jurisdiction resting in the courts of Azamgarh / Uttar Pradesh.</p>`,
      },
      {
        key: 'privacy_policy',
        title: 'Privacy Policy',
        content: `<h3>1. Overview</h3>
<p>Lagni Devi Memorial Foundation is committed to respecting and protecting the privacy of our donors, volunteers, students, and website visitors.</p>

<h3>2. Information We Collect</h3>
<p>We may collect personal information such as your name, email address, phone number, and message contents when you submit a contact form, register for a course, or make a donation.</p>

<h3>3. How We Use Your Information</h3>
<p>Your information is used solely to respond to inquiries, send donation receipts, issue course completion certificates, and keep you updated on foundation activities. We do not sell, rent, or trade your personal information to third parties.</p>

<h3>4. Data Security</h3>
<p>We implement industry-standard technical and organizational security measures to protect your data against unauthorized access, alteration, or disclosure.</p>

<h3>5. Contact Us</h3>
<p>If you have any questions regarding this Privacy Policy, please contact us at contact@ldmf.org.</p>`,
      },
      {
        key: 'donate_info',
        title: 'Donation Information & Tax Benefits',
        content: `<p>Every contribution directly funds free computer training, women's tailoring equipment, and rural medical checkups in Eastern Uttar Pradesh. Contributions qualify for 80G tax deductions.</p>`,
      },
      {
        key: 'contact_info',
        title: 'Contact Information',
        content: `<p>We welcome volunteers, partners, and community members to visit our center or get in touch through phone or email.</p>`,
      },
    ],
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
