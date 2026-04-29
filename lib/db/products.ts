import { 
    collection, 
    getDocs, 
    query, 
    where, 
    doc, 
    getDoc,
    orderBy,
    limit 
} from "firebase/firestore";
import { db } from "../firebase";

export interface Product {
    id: string;
    name: string;
    price: number;
    oldPrice?: string;
    rating: number;
    image: string;
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
