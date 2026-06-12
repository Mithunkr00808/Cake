import { db as adminDb } from "@/lib/firebase-admin";
import { getResendClient, SENDER_EMAIL } from "./client";
import { OrderStatusEmail } from "./templates/OrderStatusEmail";

export async function sendOrderStatusEmail(orderId: string, status: string) {
  try {
    const resend = getResendClient();
    if (!process.env.RESEND_API_KEY) {
      console.warn("Skipping email send: RESEND_API_KEY is not set.");
      return;
    }

    const orderDoc = await adminDb.collection("orders").doc(orderId).get();
    if (!orderDoc.exists) return;
    const order = orderDoc.data();
    if (!order) return;

    let email = order.customer?.email;
    let customerName = `${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`.trim() || "Customer";

    if (!email) {
      console.warn(`No email found for order ${orderId}, skipping status email.`);
      return;
    }

    const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: email,
      subject: `Order Update: #${orderId.slice(-6).toUpperCase()}`,
      react: OrderStatusEmail({
        orderId,
        customerName,
        status,
        items: (order.items || []).map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: formatter.format(item.price || 0),
          image: item.image,
        })),
        shippingAddress: order.customer ? {
          fullName: `${order.customer.firstName || ''} ${order.customer.lastName || ''}`.trim(),
          phone: order.customer.phone,
          streetAddress: `${order.customer.address || ''} ${order.customer.apartment || ''}`.trim(),
          city: order.customer.city,
          state: order.customer.state,
          postalCode: order.customer.pincode,
        } : {},
        totalAmount: formatter.format(order.total || 0),
      }),
    });

    if (error) {
      console.error("Resend API Error (Status):", error);
    } else {
      console.log("Status email sent successfully!", data);
    }

  } catch (error) {
    console.error("Failed to send order status email:", error);
  }
}
