# Slice of Cake 🍰

**Slice of Cake** is a premium, artisanal bakery e-commerce platform built with modern web technologies. It provides a seamless shopping experience for custom cakes, pastries, and sweet delights, complete with an intuitive shopping cart, order customization, and a comprehensive admin dashboard.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Framer Motion (for fluid animations)
- **Database & Authentication:** Firebase (Firestore, Auth, Storage) & Firebase Admin
- **Media Management:** Cloudinary
- **Form Validation:** Zod
- **Emails:** React Email & Resend

## ✨ Key Features

- **Premium UI/UX:** Responsive, beautifully designed frontend with fluid animations and a curated aesthetic.
- **E-Commerce Flow:** Full shopping cart experience, customizable product options (size, flavor, topper, inscription), and checkout.
- **Admin Dashboard:** Secure, role-protected admin area for managing:
  - Inventory and Products
  - Orders and Order Status (with automated status emails)
  - Global Store Settings (Live toggle, social links)
- **Production-Ready Resilience:**
  - Global error boundaries and polished loading states.
  - Strict runtime environment variable validation (`lib/env.ts`).

## 🛠️ Getting Started

### Prerequisites

Ensure you have Node.js and `npm` installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/slice-of-cake-next.git
cd slice-of-cake-next
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` or `.env.local` file in the root directory. Use the provided `.env.example` as a reference.

You will need keys for:
- Firebase (Client & Admin)
- Cloudinary
- Resend (for emails)

*Note: The project uses strict environment validation. If any required keys are missing, the application will throw a descriptive error on startup.*

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📂 Project Structure

- `/app` - Next.js App Router pages, layouts, and API routes.
- `/components` - Reusable UI components (Shop, Cart, Admin, Layout).
- `/lib` - Core utilities, database configuration, Firebase instances, and environment validation.
- `/public` - Static assets, images, and fonts.
- `/scripts` - Utility scripts (e.g., database seeding).

## 🛡️ Security & Authentication

- Client-side authentication is handled via Firebase Auth.
- Protected routes (like `/admin` and `/my-account`) are secured using Next.js Middleware and Firebase Admin token verification.
- Passwords and private keys are never exposed to the client.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
