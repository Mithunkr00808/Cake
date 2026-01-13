import { NextResponse } from 'next/server';

export async function GET() {
    // Mock data for initial implementation
    const products = [
        {
            id: 1,
            name: 'Birthday Cake',
            price: 84.00,
            category: 'Cakes',
            image: 'https://via.placeholder.com/300x300'
        },
        {
            id: 2,
            name: 'French Macaroon',
            price: 13.00,
            category: 'Macaron',
            image: 'https://via.placeholder.com/300x300'
        },
        {
            id: 3,
            name: 'Glazed Donut',
            price: 5.00,
            category: 'Pastry',
            image: 'https://via.placeholder.com/300x300'
        },
        {
            id: 4,
            name: 'Chocolate Cupcake',
            price: 8.00,
            category: 'Cupcake',
            image: 'https://via.placeholder.com/300x300'
        }
    ];

    return NextResponse.json(products);
}
