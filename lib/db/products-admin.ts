import { db } from '../firebase-admin';
import { Product } from './products';

export const getProductsAdmin = async (): Promise<Product[]> => {
    try {
        const productsCol = db.collection('products');
        const productSnapshot = await productsCol.get();
        const productList = productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Product));
        return productList;
    } catch (error) {
        console.error("Error fetching all products via Admin SDK:", error);
        return [];
    }
};

export const getProductByIdAdmin = async (id: string): Promise<Product | null> => {
    try {
        const docRef = db.collection('products').doc(id);
        const docSnap = await docRef.get();
        
        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() } as Product;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching product by ID via Admin SDK:", error);
        return null;
    }
};

export const getRelatedProductsAdmin = async (currentProductId: string, count: number = 3): Promise<Product[]> => {
    try {
        const productsCol = db.collection('products');
        const q = productsCol.limit(count + 1);
        const productSnapshot = await q.get();
        const productList = productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Product));
        return productList.filter(p => p.id !== currentProductId).slice(0, count);
    } catch (error) {
        console.error("Error fetching related products via Admin SDK:", error);
        return [];
    }
};
