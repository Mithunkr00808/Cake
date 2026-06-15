# Slice of Cake (Bellaria) - Website Modules Documentation

This document provides a comprehensive overview of the modules, architecture, data flow, and components of the **Slice of Cake** (Bellaria) Next.js e-commerce application.

---

## 1. Technical Stack Overview

The application is built on a modern, responsive web stack:
- **Framework**: [Next.js](https://nextjs.org/) (App Router, Version 16.1)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: React Context API (Auth & Cart Contexts)
- **Database & Auth**: [Firebase](https://firebase.google.com/) (Firestore database, Firebase Client SDK, and Firebase Admin SDK)
- **Image Storage**: [Cloudinary](https://cloudinary.com/) (Direct uploads via unsigned presets)
- **Styling & Theme**: Bootstrap, Tailwind CSS v4, custom theme stylesheets (`style.css`), FontAwesome, and Flaticon icons.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) and Swiper for sliders.

---

## 2. State Management & Contexts (`context/`)

Global states are managed through React Contexts, allowing smooth communication across client-side components:

### [AuthContext](file:///e:/AntiGravity/Cake/bellaria-next/context/AuthContext.tsx)
Manages customer and administrator authentication status.
- **State Properties**:
  - `user`: Holds the active Firebase Auth `User` object (or `null` if unauthenticated).
  - `loading`: Boolean indicating whether the initial auth state is still loading.
  - `isAdmin`: Boolean checked client-side. The admin status is determined if the user email matches the hardcoded administrator email: `sliceofcake2026@gmail.com`.
- **Hooks**: Exposes `useAuth()` custom hook for components to access auth state.

### [CartContext](file:///e:/AntiGravity/Cake/bellaria-next/context/CartContext.tsx)
Handles all shopping cart manipulations.
- **State Properties**:
  - `cartItems`: Array of items in the cart (containing `id`, `name`, `price`, `image`, and `quantity`).
  - `cartTotal`: Computed sum of prices multiplied by quantities of all active items.
  - `cartCount`: Total count of items in the cart.
- **Methods**:
  - `addToCart(product, quantity?)`: Appends a new item or increments the quantity if the product is already present in the cart.
  - `removeFromCart(id)`: Removes the specified item by ID.
  - `updateQuantity(id, quantity)`: Updates quantity value (enforces minimum `1` quantity).
  - `clearCart()`: Completely flushes the cart state.
- **Persistence**: Synchronizes state automatically with the browser's `localStorage` under the key `bellaria_cart`.

---

## 3. Database Layer (`lib/db/`)

Interfaces directly with Google Firestore using helper libraries.

### [products.ts](file:///e:/AntiGravity/Cake/bellaria-next/lib/db/products.ts)
Exposes CRUD actions for the products catalog.
- **Firestore Collection**: `products`
- **Product Schema**:
  ```typescript
  export interface Product {
      id: string;
      name: string;
      price: number;
      oldPrice?: string;
      rating: number;
      image: string;
      images?: string[];
      sale: boolean;
      description?: string;
      category?: string;
  }
  ```
- **Key Methods**:
  - `getProducts()`: Fetches all products.
  - `getProductById(id)`: Fetches a single product document by ID.
  - `addProduct(product)`: Adds a new product document.
  - `updateProduct(id, product)`: Modifies fields on a product document.
  - `deleteProduct(id)`: Removes a product from the collection.

### [orders.ts](file:///e:/AntiGravity/Cake/bellaria-next/lib/db/orders.ts)
Handles customer checkout submissions and order state tracking.
- **Firestore Collection**: `orders`
- **Order Statuses (`OrderStatus`)**: `pending` | `confirmed` | `processing` | `out_for_delivery` | `delivered` | `cancelled`.
- **Order Schema**:
  ```typescript
  export interface Order {
      id: string;
      userId?: string;
      customer: OrderCustomer; // firstName, lastName, email, phone, address, apartment, city, state, pincode, country
      items: OrderItem[];      // id, name, price, quantity, image
      total: number;
      paymentMethod: string;
      notes: string;
      status: OrderStatus;
      createdAt: Timestamp;
  }
  ```
- **Key Methods**:
  - `createOrder(data)`: Persists a new customer order with a server timestamp.
  - `getOrders()`: Fetches all orders, ordered by `createdAt` descending (used in the Admin Panel).
  - `getOrdersByUserId(userId)`: Fetches past orders placed by a specific logged-in customer. Sorts client-side to optimize queries.
  - `updateOrderStatus(id, status)`: Sets a new status for the order.

### [settings.ts](file:///e:/AntiGravity/Cake/bellaria-next/lib/db/settings.ts)
Manages dynamic shop configurations.
- **Firestore Path**: Document `settings` in the `store` collection (`store/settings`).
- **Schema**:
  ```typescript
  export interface StoreSettings {
      aboutUsText?: string;
      contactEmail?: string;
      contactPhone?: string;
      deliverablePincodes?: string[];
  }
  ```
- **Key Methods**:
  - `getSettings()`: Fetches configurations like deliverable pincodes and about-us page text.
  - `updateSettings(settings)`: Updates configurations using merge fields.

---

## 4. Public Customer Portal (App Routes)

Public routes handle customer landing, browsing, cart actions, account pages, and checkout.

### Home Module (`/`)
- **Route File**: `app/page.tsx`
- **Components**:
  - `HeroSlider`: Large main slider showcase with premium images, promotional banners, and call-to-actions.
  - `ServicesSection`: Showcases categories of custom cake services (e.g., birthday cakes, wedding setups, cupcakes).
  - `PortfolioSection`: Gallery grid showcasing aesthetic images of baked treats.
  - `CallToAction`: Catchy promo card pointing to the shop.

### About Us Module (`/about-us`)
- **Route File**: `app/about-us/page.tsx`
- **Components**:
  - `AboutSection` & `DynamicAboutSection`: Fetches and displays store history, brand message, and dynamic text pulled from Firestore store settings.

### Portfolio Module (`/portfolio`)
- **Route File**: `app/portfolio/page.tsx`
- **Functionality**: Detailed page showing structured galleries of cakes, decorations, and descriptions.

### Shop Module (`/shop` and `/shop/[slug]`)
- **Route Files**: `app/shop/page.tsx` & `app/shop/[slug]/page.tsx`
- **Components**:
  - `ProductGrid`: Loads products from Firestore. Provides dynamic layout, loader skeletons, rating stars, price listings, and a customized sorting dropdown (Popularity, Average Rating, Newness, Price Low-High, Price High-Low).
  - `ShopSidebar`: Displays a quick-view shopping cart widget on the side for desktop users, facilitating quick cart subtotals, item removals, and checkout links.
  - `ProductDetails`: Renders the single product view, supporting image galleries, star ratings, long description text, and dynamic quantity selectors to add to the cart.

### Shopping Cart Module (`/cart`)
- **Route File**: `app/cart/page.tsx`
- **Component**:
  - `ShoppingCart`: Displays a detailed tabular view of all selected items. Uses `Framer Motion`'s `AnimatePresence` to animate cart item removal smoothly. Features input selectors to update quantities and links to proceed to checkout or clear the cart.

### Checkout Module (`/checkout`)
- **Route File**: `app/checkout/page.tsx`
- **Components**:
  - `Checkout` & `CheckoutForm`: Validates fields like name, contact info, shipping address, and payment method.
  - **Delivery Verification**: During checkout, the module checks if the user's input pincode is present in the `deliverablePincodes` list fetched from the global settings. If it's not present, it restricts order placement to protect delivery logistics.

### Customer Authentication Module (`/login`)
- **Route File**: `app/login/page.tsx`
- **Functionality**: Customer portal to log in, register a new account, or recover passwords. Connected to Firebase Auth for session storage.

### My Account Module (`/my-account`)
- **Route File**: `app/my-account/page.tsx`
- **Functionality**: Allows logged-in users to review profile parameters, delivery addresses, and view their purchase histories (lists previous orders with item names, date stamps, payment methods, and real-time delivery status updates).

---

## 5. Admin Portal Module (`/admin`)

The administration suite manages inventory, orders, and configurations.

### Security Layout (`/admin/layout.tsx`)
- **Protected Routing**: Checks `useAuth` hook loading and admin status.
- **Route Guard**: If `isAdmin` is false or the user is unauthenticated, the application automatically redirects the browser to `/admin/login`, bypassing access to admin dashboard content.

### Admin Dashboard Home (`/admin`)
- **Route File**: `app/admin/page.tsx`
- **Functionality**: Central routing portal providing navigation controls and summaries for **Inventory**, **Orders**, and **Store Settings**.

### Inventory Management (`/admin/inventory`)
- **Route File**: `app/admin/inventory/page.tsx`
- **Component**:
  - `ProductForm`: Handles adding or editing product data.
  - **Cloudinary Integration**: Utilizes the Next-Cloudinary widget (`CldUploadWidget`) to upload product images directly to Cloudinary. It yields secure URLs that are saved inside the Firestore product records.
  - **Inventory List**: Displays existing products in a table format with quick controls to trigger forms or delete products.

### Order Management (`/admin/orders`)
- **Route File**: `app/admin/orders/page.tsx`
- **Functionality**: Lists all customer orders placed.
  - **Status Updates**: Dropdown menus allow updating the `OrderStatus` (e.g. changing status from `pending` to `confirmed` or `delivered`).
  - **Expandable Detail Rows**: Administrators can toggle open details for any order to examine exactly what items were bought, billing address, custom message notes, and customer phone/email details.

### Store Settings (`/admin/settings`)
- **Route File**: `app/admin/settings/page.tsx`
- **Functionality**: Configures global variables saved in Firestore:
  - Serviceable delivery pincodes (as a comma-separated list of strings).
  - Main Contact Email and Contact Phone number.
  - Dynamic "About Us" text displayed on customer-facing information pages.
