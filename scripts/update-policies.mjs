import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        })
    });
}

const db = admin.firestore();

const privacyPolicyText = `At Slice of Cake, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or make a purchase.

1. Information We Collect
We collect information that you provide directly to us, such as when you create an account, place an order, subscribe to our newsletter, or contact our customer support. This information may include your name, email address, phone number, shipping address, and payment details.

2. How We Use Your Information
We use the information we collect to:
- Process and fulfill your orders, including sending order confirmations and delivery updates.
- Communicate with you about products, services, promotions, and events.
- Improve our website, customer service, and overall shopping experience.
- Detect and prevent fraud or abuse.

3. Sharing Your Information
We do not sell or rent your personal information to third parties. We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, or delivering orders. These third parties are obligated to keep your information secure and confidential.

4. Data Security
We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.

5. Your Choices
You have the right to access, update, or delete your personal information. If you no longer wish to receive promotional emails from us, you can unsubscribe using the link provided in those emails.

6. Changes to This Policy
We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.

Contact Us
If you have any questions or concerns about this Privacy Policy, please contact us at [Contact Email] or [Contact Phone].`;

const termsOfUseText = `Welcome to Slice of Cake. By accessing or using our website, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree with these terms, please do not use our website.

1. Use of the Website
You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of this website by any third party.

2. Product Information and Pricing
We strive to ensure that all details, descriptions, and prices of products appearing on the website are accurate. However, errors may occur. If we discover an error in the price of any goods you have ordered, we will inform you as soon as possible and give you the option of reconfirming your order at the correct price or canceling it.

3. Orders and Payment
By placing an order, you are offering to purchase a product subject to these Terms of Use. All orders are subject to availability and confirmation of the order price. We reserve the right to refuse any request made by you.

4. Intellectual Property
All content included on this website, such as text, graphics, logos, images, and software, is the property of Slice of Cake or its content suppliers and protected by copyright laws. You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of the website without express written permission from us.

5. Limitation of Liability
Slice of Cake shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the website or for the cost of procurement of substitute goods and services.

6. Governing Law
These Terms of Use shall be governed by and construed in accordance with the laws of the jurisdiction in which our business is registered, without giving effect to any principles of conflicts of law.

7. Changes to Terms
We reserve the right to modify these Terms of Use at any time. Your continued use of the website following any changes signifies your acceptance of the new terms.

Contact Us
If you have any questions about these Terms of Use, please contact us at [Contact Email] or [Contact Phone].`;

const refundPolicyText = `Thank you for shopping at Slice of Cake! We want you to be completely satisfied with your purchase. 

1. General Policy
Because our products are perishable and custom-made, we generally do not accept returns or offer refunds once an order has been picked up or delivered. However, we evaluate each situation on a case-by-case basis.

2. Order Cancellations
If you need to cancel an order, you must do so at least 48 hours before the scheduled pickup or delivery time. Cancellations made within the 48-hour window may not be eligible for a refund, as ingredients and preparation time have already been allocated.

3. Issues with Your Order
If you receive a product that is incorrect, damaged, or does not meet our quality standards, please contact us immediately upon receipt. We may request photos of the item to help us understand the issue. 
- If the error is ours, we will offer a replacement or issue a full or partial refund to the original payment method.

4. Refunds Process
Approved refunds will be processed and applied to your original method of payment within 5-7 business days, depending on your bank or credit card provider.

Contact Us
If you have any questions about our Refund Policy, please contact us at [Contact Email] or [Contact Phone].`;

const updateSettings = async () => {
    try {
        const docRef = db.collection('store').doc('settings');
        await docRef.set({
            privacyPolicyText,
            termsOfUseText,
            refundPolicyText
        }, { merge: true });
        console.log("Successfully updated legal policies in Firestore!");
    } catch (err) {
        console.error("Error updating settings:", err);
    }
    process.exit(0);
};

updateSettings();
