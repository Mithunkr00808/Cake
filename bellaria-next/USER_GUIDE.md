# Slice of Cake (Bellaria) - End-User Documentation

Welcome to the **Slice of Cake** (Bellaria) User Manual. This guide provides step-by-step instructions on how to use the website, divided into two sections:
1. **Customer Guide**: How to browse, order, and track purchases.
2. **Administrator Guide**: How to manage inventory, process orders, and configure store settings.

---

# SECTION 1: Customer Guide

The Customer Portal allows you to browse our delicious selection of cakes, cookies, and pastries, place orders, and review past purchases.

## 1. Browsing the Shop
- Navigate to the **Shop** page using the main header menu.
- Use the **Sort** dropdown at the top right of the product grid to sort items based on:
  - **Popularity** / **Average Rating**
  - **Newness** (latest arrivals first)
  - **Price** (low-to-high or high-to-low)
- Click on any product's image or name to open the **Product Details** page. Here you can read descriptions, view rating stars, and inspect additional images.

## 2. Managing Your Cart
- From the **Product Details** page, adjust the quantity selector and click **Add to Cart**.
- On desktop, a summary of your cart is displayed in the sidebar widget.
- Click **View Cart** or navigate to the `/cart` page to view the detailed shopping cart table:
  - **Adjust Quantities**: Change the numeric value in the quantity field to automatically update subtotals.
  - **Remove Items**: Click the red cross (`×`) button next to any item to remove it from your cart.
  - **Clear Cart**: Click the **Clear Cart** button to empty the cart completely.
- When ready, click **Proceed to Checkout**.

## 3. Placing an Order (Checkout)
On the **Checkout** page:
1. **Fill in Billing & Shipping Details**: Provide your name, contact phone number, email address, and exact physical shipping address.
2. **Select Delivery Location**: Enter your postal Pincode. 
   - *Note*: Our system automatically verifies your pincode. If we do not currently deliver to your area, the checkout system will alert you and prevent order submission.
3. **Add Custom Notes**: Enter any special instructions in the "Order Notes" text field (e.g., eggless preference, birthday messages, or delivery timings).
4. **Choose Payment Method**: Select either Cash on Delivery or Card Payment.
5. **Place Order**: Review the final total and submit your order. You will be redirected to an **Order Confirmation** page with your order details and reference number.

## 4. Managing Your Account
- Click **Login** / **Register** in the header to create an account or sign in using your email and password.
- Once signed in, access **My Account**:
  - View your profile details.
  - View your **Order History** dashboard containing order reference numbers, dates, pricing, payment configurations, and real-time delivery tracking statuses (e.g. *Pending*, *Out for Delivery*, *Delivered*).

---

# SECTION 2: Administrator Guide

The Admin Portal allows store managers to control products, update client orders, and manage serviceable regions.

## 1. Accessing the Admin Panel
- Navigate to the `/admin` URL path in your browser.
- **Login Required**: You must sign in using the designated admin email address: `sliceofcake2026@gmail.com`.
- *Note*: Access is restricted. If any other email or non-admin user attempts to enter this panel, the system will automatically redirect them back to the login screen or home page.

## 2. Inventory Management (Products)
Click **Inventory** in the admin sidebar navigation to manage what cakes are displayed in the shop:
- **Add a Product**:
  1. Click **Add New Product** in the top right.
  2. Input the Product Name, Price, and optional Old Price (for sale markdowns).
  3. Set a Category and detailed Description.
  4. Check the **On Sale** checkbox if you want to feature this product as a promotional item.
  5. Click **Upload Images** to launch the Cloudinary uploader. Choose files from your computer or drag and drop. Once uploaded, click **Save Product**.
- **Edit a Product**:
  1. Locate the product in the table and click the **Edit** button.
  2. Modify pricing, description, or upload/delete images. Click **Save Product** to save.
- **Delete a Product**:
  1. Click the red **Delete** button next to a product in the table.
  2. Confirm the browser prompt to permanently remove it from the catalog.

## 3. Order Processing (Tracking & Fulfilling)
Click **Orders** in the admin sidebar to review and process customer requests:
- **Order List**: Displays all orders placed chronologically, detailing customer name, total price, payment type, date, and status.
- **Inspect Order Details**: Click the down-arrow button (`▼`) on the right of any order to expand it. You will see:
  - The precise items and quantities purchased.
  - Detailed shipping/billing address and contact phone number.
  - Custom message notes (e.g., custom frosting messages).
- **Update Status**: Use the status dropdown on any order to change its fulfillment state:
  - Set to **Confirmed** once payment/delivery is approved.
  - Set to **Processing** when the kitchen begins baking.
  - Set to **Out for Delivery** when the order is handed to the dispatch team.
  - Set to **Delivered** or **Cancelled** to finalize the order record.

## 4. Store Configurations
Click **Store Settings** in the admin sidebar to update global shop properties:
- **Contact Details**: Update the Contact Email and Contact Phone number displayed to visitors.
- **Serviceable Delivery Areas**: 
  - Manage the **Serviceable Pincodes** text box. Enter all postal codes where your drivers can deliver, separated by commas (e.g., `110001, 400001, 560001`).
  - *Warning*: Any customer trying to check out with a pincode not matching this list will be prevented from placing their order.
- **About Us**: Update the dynamic text description explaining the bakery's history. This automatically reflects on the customer's `/about-us` section.
- Click **Save Settings** to persist the changes.
