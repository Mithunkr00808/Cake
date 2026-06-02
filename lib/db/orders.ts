import {
    collection,
    getDocs,
    doc,
    addDoc,
    updateDoc,
    orderBy,
    query,
    where,
    Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'out_for_delivery'
    | 'delivered'
    | 'cancelled';

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface OrderCustomer {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}

export interface Order {
    id: string;
    userId?: string;
    customer: OrderCustomer;
    items: OrderItem[];
    total: number;
    paymentMethod: string;
    notes: string;
    status: OrderStatus;
    createdAt: Timestamp;
}

export type CreateOrderInput = Omit<Order, 'id' | 'createdAt'>;

export const createOrder = async (data: CreateOrderInput): Promise<string | null> => {
    try {
        const docRef = await addDoc(collection(db, 'orders'), {
            ...data,
            createdAt: Timestamp.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating order:", error);
        return null;
    }
};

export const getOrders = async (): Promise<Order[]> => {
    try {
        const ordersCol = collection(db, 'orders');
        const q = query(ordersCol, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Order));
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
};

export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
    try {
        const ordersCol = collection(db, 'orders');
        const q = query(ordersCol, where('userId', '==', userId), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Order));
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return [];
    }
};

export const updateOrderStatus = async (id: string, status: OrderStatus): Promise<boolean> => {
    try {
        const docRef = doc(db, 'orders', id);
        await updateDoc(docRef, { status });
        return true;
    } catch (error) {
        console.error("Error updating order status:", error);
        return false;
    }
};
