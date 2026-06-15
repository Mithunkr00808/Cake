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

export interface Product {
    id: string;
    slug?: string;
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

export const getRelatedProducts = async (currentProductId: string, count: number = 3): Promise<Product[]> => {
    try {
        const productsCol = collection(db, 'products');
        const q = query(productsCol, limit(count + 1));
        const productSnapshot = await getDocs(q);
        const productList = productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Product));
        return productList.filter(p => p.id !== currentProductId).slice(0, count);
    } catch (error) {
        console.error("Error fetching related products from Firestore:", error);
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

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
    try {
        const productsCol = collection(db, 'products');
        const q = query(productsCol, where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() } as Product;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching product by slug:", error);
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
