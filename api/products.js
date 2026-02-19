// Standalone products endpoint for demo mode
const mockProducts = [
    {
        _id: '1',
        title: 'Wireless Bluetooth Headphones',
        description: 'Premium quality wireless headphones with noise cancellation, 30-hour battery life, and comfortable over-ear design.',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        category: 'Electronics',
        retailer: 'TechStore'
    },
    {
        _id: '2',
        title: 'Classic Leather Wallet',
        description: 'Genuine leather bifold wallet with multiple card slots and RFID blocking technology.',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
        category: 'Accessories',
        retailer: 'FashionHub'
    },
    {
        _id: '3',
        title: 'Smart Fitness Watch',
        description: 'Track your health and fitness with heart rate monitor, step counter, sleep tracking, and smartphone notifications.',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        category: 'Electronics',
        retailer: 'TechStore'
    },
    {
        _id: '4',
        title: 'Organic Coffee Beans',
        description: 'Premium arabica coffee beans from Colombia. Rich, smooth flavor with notes of chocolate and caramel.',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
        category: 'Food & Beverages',
        retailer: 'GourmetGoods'
    },
    {
        _id: '5',
        title: 'Minimalist Backpack',
        description: 'Water-resistant backpack with laptop compartment, perfect for work or travel. Sleek modern design.',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        category: 'Bags',
        retailer: 'TravelEssentials'
    },
    {
        _id: '6',
        title: 'Stainless Steel Water Bottle',
        description: 'Eco-friendly insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
        category: 'Home & Kitchen',
        retailer: 'EcoLiving'
    },
    {
        _id: '7',
        title: 'Wireless Phone Charger',
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400',
        category: 'Electronics',
        retailer: 'TechStore'
    },
    {
        _id: '8',
        title: 'Aromatherapy Essential Oils Set',
        description: 'Set of 6 pure essential oils including lavender, eucalyptus, peppermint, tea tree, lemon, and orange.',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
        category: 'Health & Beauty',
        retailer: 'WellnessWorld'
    }
];

module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method === 'GET') {
        return res.status(200).json(mockProducts);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
};
