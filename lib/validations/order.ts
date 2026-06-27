import { z } from 'zod';

export const orderItemSchema = z.object({
    id: z.union([z.string(), z.number()]).transform(val => val.toString()),
    productId: z.union([z.string(), z.number()]).transform(val => val.toString()).optional(),
    name: z.string().min(1, "Product name is required"),
    price: z.number().nonnegative("Price cannot be negative"),
    quantity: z.number().int().positive("Quantity must be at least 1"),
    image: z.string().optional(),
    options: z.object({
        size: z.object({ label: z.string().max(50), priceModifier: z.number() }).optional(),
        flavor: z.string().max(100).optional(),
        message: z.string().max(200).optional(),
        topper: z.string().max(100).optional(),
        photoUrl: z.string().url().max(500).optional(),
    }).optional(),
});

export const orderCustomerSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
    lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
    email: z.string().email("Invalid email address").optional().or(z.literal('')),
    phone: z.string().min(5, "Phone number is too short").max(20, "Phone number is too long"),
    address: z.string().min(2, "Address is required"),
    apartment: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().min(4, "Pincode is too short").max(10, "Pincode is too long"),
    country: z.string().min(2, "Country is required"),
});

export const createOrderSchema = z.object({
    userId: z.string().optional(),
    customer: orderCustomerSchema,
    items: z.array(orderItemSchema).min(1, "Order must contain at least one item"),
    total: z.number().nonnegative("Total cannot be negative"),
    paymentMethod: z.string().min(1, "Payment method is required"),
    notes: z.string().optional(),
    status: z.enum(['pending', 'processing', 'completed', 'cancelled']).default('pending'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
