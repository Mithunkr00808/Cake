import { 
    collection, 
    getDocs, 
    query, 
    where, 
    doc, 
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    orderBy,
    limit 
} from "firebase/firestore";
import { db } from "../firebase";

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'preorder';

export interface ProductSize {
    id: string;
    label: string;
    servings: string;
    priceModifier: number;
}

export interface CustomizationOptions {
    allowMessage: boolean;
    messageMaxLength?: number;
    allowTopper: boolean;
    topperOptions?: string[];
    allowPhotoUpload: boolean;
}

export interface DeliveryConfig {
    fee: number;
    leadTimeHours: number;
}

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

    // Advanced Options
    shortDescription?: string;
    fullDescription?: string; 
    sizes?: ProductSize[];
    flavors?: string[]; 
    maxQuantity?: number;
    stock?: StockStatus;
    customization?: CustomizationOptions;
    deliveryConfig?: DeliveryConfig;
    relatedProductIds?: string[];
    dietaryTags?: string[];
    ctaText?: string;
}

export const getProducts = async (): Promise<Product[]> => {
    try {
        const productsCol = collection(db, 'products');
        const productSnapshot = await getDocs(productsCol);
        const productList = productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Product));
        return productList;
    } catch (error) {
        console.error("Error fetching products from Firestore:", error);
        return [];
    }
};

export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Product;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<string | null> => {
    try {
        const docRef = await addDoc(collection(db, 'products'), product);
        return docRef.id;
    } catch (error) {
        console.error("Error adding product:", error);
        return null;
    }
};

export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id'>>): Promise<boolean> => {
    try {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, product);
        return true;
    } catch (error) {
        console.error("Error updating product:", error);
        return false;
    }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
    try {
        const docRef = doc(db, 'products', id);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error("Error deleting product:", error);
        return false;
    }
};
