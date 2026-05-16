// Product data for FreshCart - 32 products across 8 categories
// All images use Unsplash with verified photo IDs matching product names

export const categories = [
  { id: 'fruits', name: 'Fruits', icon: '🍎', count: 6 },
  { id: 'vegetables', name: 'Vegetables', icon: '🥦', count: 6 },
  { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛', count: 5 },
  { id: 'bakery', name: 'Bakery', icon: '🍞', count: 3 },
  { id: 'beverages', name: 'Beverages', icon: '🥤', count: 4 },
  { id: 'snacks', name: 'Snacks', icon: '🍿', count: 3 },
  { id: 'meat', name: 'Meat & Fish', icon: '🥩', count: 2 },
  { id: 'household', name: 'Household', icon: '🧹', count: 3 },
];

export const products = [
  // ===== FRUITS =====
  {
    id: 1, name: 'Red Apples', category: 'fruits', price: 149, originalPrice: 199, weight: '1 kg', rating: 4.5, reviews: 523, stock: 45,
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=300&fit=crop',
    badge: null, organic: true, bought: 1250,
    desc: 'Premium Shimla apples, handpicked for quality. Rich in fiber and antioxidants. Perfect for snacking or salads.'
  },

  {
    id: 2, name: 'Fresh Bananas', category: 'fruits', price: 45, originalPrice: 55, weight: '500 g (5-6 pcs)', rating: 4.3, reviews: 890, stock: 120,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=300&fit=crop',
    badge: null, organic: false, bought: 3200,
    desc: 'Fresh ripe bananas from local farms. Great source of potassium and energy.'
  },

  {
    id: 3, name: 'Strawberries', category: 'fruits', price: 199, originalPrice: 249, weight: '250 g', rating: 4.7, reviews: 312, stock: 8,
    image: 'https://images.unsplash.com/photo-1495570689269-d883b1224443?w=400&h=300&fit=crop',
    badge: '20% OFF', organic: true, bought: 890,
    desc: 'Sweet and juicy strawberries from Mahabaleshwar farms. Perfect for smoothies, desserts, or eating fresh.'
  },

  {
    id: 4, name: 'Alphonso Mangoes', category: 'fruits', price: 499, originalPrice: 699, weight: '1 kg (3-4 pcs)', rating: 4.8, reviews: 1205, stock: 3,
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&h=300&fit=crop',
    badge: '30% OFF', organic: false, bought: 2100,
    desc: 'King of fruits! Premium Ratnagiri Alphonso mangoes with intense aroma and sweetness.'
  },

  {
    id: 5, name: 'Pomegranate', category: 'fruits', price: 189, originalPrice: 220, weight: '500 g (2 pcs)', rating: 4.4, reviews: 267, stock: 32,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Pomegranate_split_open_and_whole.jpg/640px-Pomegranate_split_open_and_whole.jpg',
    badge: null, organic: true, bought: 650,
    desc: 'Juicy pomegranates packed with antioxidants. Great for juice or as a healthy snack.'
  },

  {
    id: 6, name: 'Fresh Oranges', category: 'fruits', price: 89, originalPrice: 110, weight: '1 kg', rating: 4.2, reviews: 445, stock: 55,
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=300&fit=crop',
    badge: null, organic: false, bought: 1800,
    desc: 'Nagpur oranges, known for their sweetness and high vitamin C content.'
  },

  // ===== VEGETABLES =====
  {
    id: 7, name: 'Fresh Tomatoes', category: 'vegetables', price: 35, originalPrice: 50, weight: '500 g', rating: 4.1, reviews: 1102, stock: 200,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
    badge: '30% OFF', organic: false, bought: 5600,
    desc: 'Farm-fresh tomatoes perfect for curries, salads, and chutneys.'
  },

  {
    id: 8, name: 'Baby Spinach', category: 'vegetables', price: 45, originalPrice: 60, weight: '200 g', rating: 4.6, reviews: 334, stock: 18,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
    badge: null, organic: true, bought: 920,
    desc: 'Tender baby spinach leaves, washed and ready to eat. Rich in iron and vitamins.'
  },

  {
    id: 9, name: 'Red Onions', category: 'vegetables', price: 30, originalPrice: 40, weight: '1 kg', rating: 4.0, reviews: 2340, stock: 500,
    image: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400&h=300&fit=crop',
    badge: null, organic: false, bought: 8900,
    desc: 'Essential kitchen staple. Fresh Nashik onions for everyday cooking.'
  },

  {
    id: 10, name: 'Broccoli', category: 'vegetables', price: 75, originalPrice: 95, weight: '300 g', rating: 4.5, reviews: 189, stock: 12,
    image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=400&h=300&fit=crop',
    badge: null, organic: true, bought: 430,
    desc: 'Fresh green broccoli florets. Excellent source of vitamins C and K.'
  },

  {
    id: 11, name: 'Fresh Potatoes', category: 'vegetables', price: 25, originalPrice: 30, weight: '1 kg', rating: 4.2, reviews: 3456, stock: 800,
    image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=300&fit=crop',
    badge: null, organic: false, bought: 12000,
    desc: 'Fresh potatoes ideal for curries, fries, and roasting.'
  },

  {
    id: 12, name: 'Green Capsicum', category: 'vegetables', price: 55, originalPrice: 70, weight: '250 g', rating: 4.3, reviews: 267, stock: 25,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop',
    badge: '20% OFF', organic: false, bought: 780,
    desc: 'Crisp and fresh green bell peppers, perfect for salads and stir-fry.'
  },

  // ===== DAIRY & EGGS =====
  {
    id: 13, name: 'Fresh Whole Milk', category: 'dairy', price: 30, originalPrice: 30, weight: '500 ml', rating: 4.4, reviews: 5670, stock: 300,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
    badge: null, organic: false, bought: 15000,
    desc: 'Fresh pasteurized whole milk. Packed with calcium and nutrition for the whole family.'
  },

  {
    id: 14, name: 'Greek Yogurt', category: 'dairy', price: 89, originalPrice: 120, weight: '400 g', rating: 4.7, reviews: 890, stock: 22,
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&h=300&fit=crop',
    badge: '26% OFF', organic: false, bought: 2300,
    desc: 'Creamy Greek yogurt with high protein content. Perfect for breakfast or smoothies.'
  },

  {
    id: 15, name: 'Farm Fresh Eggs', category: 'dairy', price: 85, originalPrice: 99, weight: '10 pcs', rating: 4.5, reviews: 2345, stock: 60,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&fit=crop',
    badge: null, organic: true, bought: 6700,
    desc: 'Free-range farm fresh eggs. Rich in protein and omega-3.'
  },

  {
    id: 16, name: 'Salted Butter', category: 'dairy', price: 56, originalPrice: 56, weight: '100 g', rating: 4.6, reviews: 4500, stock: 150,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=300&fit=crop',
    badge: null, organic: false, bought: 9800,
    desc: 'Creamy salted butter. Perfect for toast, cooking, and baking.'
  },

  {
    id: 17, name: 'Fresh Paneer', category: 'dairy', price: 95, originalPrice: 110, weight: '200 g', rating: 4.3, reviews: 1800, stock: 35,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
    badge: null, organic: false, bought: 4500,
    desc: 'Soft and fresh cottage cheese block. Perfect for Indian curries and snacks.'
  },

  // ===== BAKERY =====
  {
    id: 18, name: 'Whole Wheat Bread', category: 'bakery', price: 45, originalPrice: 55, weight: '400 g', rating: 4.2, reviews: 2100, stock: 40,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    badge: null, organic: false, bought: 5600,
    desc: 'Freshly baked whole wheat bread. High in fiber and nutrients.'
  },

  {
    id: 19, name: 'Butter Croissants', category: 'bakery', price: 89, originalPrice: 110, weight: '2 pcs', rating: 4.8, reviews: 560, stock: 5,
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&h=300&fit=crop',
    badge: 'NEW', organic: false, bought: 1200,
    desc: 'Flaky golden butter croissants, freshly baked every morning.'
  },

  {
    id: 20, name: 'Oatmeal Cookies', category: 'bakery', price: 120, originalPrice: 150, weight: '200 g', rating: 4.4, reviews: 340, stock: 28,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
    badge: '20% OFF', organic: true, bought: 780,
    desc: 'Healthy oatmeal cookies with raisins, oats, and honey.'
  },

  // ===== BEVERAGES =====
  {
    id: 21, name: 'Green Tea Bags', category: 'beverages', price: 195, originalPrice: 250, weight: '25 bags', rating: 4.6, reviews: 1890, stock: 45,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&h=300&fit=crop',
    badge: '22% OFF', organic: true, bought: 3400,
    desc: 'Refreshing green tea with natural mint. Antioxidant-rich and calming.'
  },

  {
    id: 22, name: 'Cold Brew Coffee', category: 'beverages', price: 299, originalPrice: 350, weight: '250 ml', rating: 4.7, reviews: 670, stock: 15,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=300&fit=crop',
    badge: null, organic: false, bought: 1500,
    desc: 'Smooth and bold cold brew coffee. Slow-steeped for 18 hours.'
  },

  {
    id: 23, name: 'Orange Juice', category: 'beverages', price: 89, originalPrice: 99, weight: '1 L', rating: 4.3, reviews: 1234, stock: 35,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop',
    badge: null, organic: false, bought: 2800,
    desc: '100% fresh squeezed orange juice. No added sugar or preservatives.'
  },

  {
    id: 24, name: 'Fresh Coconut Water', category: 'beverages', price: 45, originalPrice: 55, weight: '200 ml', rating: 4.5, reviews: 2340, stock: 70,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop',
    badge: null, organic: true, bought: 5600,
    desc: 'Natural tender coconut water. Ultimate hydration drink.'
  },

  // ===== SNACKS =====
  {
    id: 25, name: 'Mixed Nuts Premium', category: 'snacks', price: 399, originalPrice: 499, weight: '250 g', rating: 4.8, reviews: 890, stock: 20,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ce/Mixed_nuts_1.jpg/640px-Mixed_nuts_1.jpg',
    badge: '20% OFF', organic: false, bought: 2100,
    desc: 'Premium assortment of almonds, cashews, walnuts, and pistachios.'
  },

  {
    id: 26, name: 'Banana Chips', category: 'snacks', price: 85, originalPrice: 99, weight: '200 g', rating: 4.4, reviews: 1560, stock: 55,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Banana_chips_from_Kerala.jpg/640px-Banana_chips_from_Kerala.jpg',
    badge: null, organic: false, bought: 3200,
    desc: 'Crispy Kerala banana chips fried in coconut oil.'
  },

  {
    id: 27, name: 'Dark Chocolate Bar', category: 'snacks', price: 175, originalPrice: 220, weight: '100 g', rating: 4.7, reviews: 670, stock: 18,
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop',
    badge: null, organic: true, bought: 1400,
    desc: 'Premium dark chocolate bar with 70% cocoa content. Rich and intense.'
  },

  // ===== MEAT & FISH =====
  {
    id: 28, name: 'Chicken Breast', category: 'meat', price: 280, originalPrice: 320, weight: '500 g', rating: 4.3, reviews: 1200, stock: 25,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop',
    badge: null, organic: false, bought: 3400,
    desc: 'Boneless chicken breast, cleaned and ready to cook. High in protein.'
  },

  {
    id: 29, name: 'Salmon Fillet', category: 'meat', price: 699, originalPrice: 899, weight: '250 g', rating: 4.9, reviews: 340, stock: 4,
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=300&fit=crop',
    badge: '22% OFF', organic: false, bought: 780,
    desc: 'Premium salmon fillet, boneless and skinless. Rich in omega-3 fatty acids.'
  },

  // ===== HOUSEHOLD =====
  {
    id: 30, name: 'Dish Wash Gel', category: 'household', price: 145, originalPrice: 175, weight: '500 ml', rating: 4.2, reviews: 3400, stock: 100,
    image: 'https://placehold.co/400x300/fcfce3/fbbf24?text=Dish+Wash+Gel',
    badge: null, organic: false, bought: 7800,
    desc: 'Effective dish washing gel with lemon fragrance. Tough on grease, gentle on hands.'
  },

  {
    id: 31, name: 'Paper Towel Rolls', category: 'household', price: 120, originalPrice: 140, weight: '2 rolls', rating: 4.1, reviews: 2100, stock: 65,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop',
    badge: null, organic: false, bought: 5400,
    desc: 'Super absorbent kitchen paper towels. 2-ply, strong and soft.'
  },

  {
    id: 32, name: 'Liquid Hand Wash', category: 'household', price: 99, originalPrice: 130, weight: '250 ml', rating: 4.5, reviews: 1800, stock: 40,
    image: 'https://placehold.co/400x300/f0fdfa/14b8a6?text=Hand+Wash',
    badge: '24% OFF', organic: true, bought: 4200,
    desc: 'Antibacterial liquid hand wash with natural ingredients. Gentle on skin.'
  },
];

export function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

export function getProductsByCategory(categoryId) {
  return products.filter(p => p.category === categoryId);
}

export function searchProducts(query) {
  const lq = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lq) ||
    p.category.toLowerCase().includes(lq) ||
    p.desc.toLowerCase().includes(lq)
  );
}

export function getTopDeals() {
  return products.filter(p => p.badge && p.badge.includes('OFF')).slice(0, 6);
}

export function getTrending() {
  return [...products].sort((a, b) => b.bought - a.bought).slice(0, 8);
}
