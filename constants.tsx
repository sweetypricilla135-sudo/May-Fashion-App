
import React from 'react';
import { Shirt, ShoppingBag, User, HelpCircle, Search, Layers, Zap, Clock, Sparkles, Footprints, Watch, Wind, UserCheck } from 'lucide-react';
import { Product, StyleLook } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cyber-Knit Runner Jacket',
    price: 249.99,
    category: 'techwear',
    subCategory: 'outerwear',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800',
    description: 'Thermo-reactive fabric that adjusts to your body temperature. Features waterproof seams and 8 hidden pockets.',
    colors: ['#000000', '#32CD32', '#4B0082'],
    threeDModel: 'outerwear',
    type: 'Jackets',
    subType: 'Tech Shell'
  },
  {
    id: 'w1',
    name: 'Cyber-Silk Kurta Set',
    price: 159.00,
    category: 'ethnic',
    subCategory: 'apparel',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=800',
    description: 'Neon-infused silk kurta with matching palazzo. Integrated smart-cooling fibers for tropical climate comfort.',
    colors: ['#00BFFF', '#FF1493'],
    type: 'Kurtis',
    subType: 'Kurta Sets'
  },
  {
    id: 'w2',
    name: 'Matrix Straight Cut Kurti',
    price: 89.00,
    category: 'ethnic',
    subCategory: 'apparel',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69abb5db8?auto=format&fit=crop&q=80&w=800',
    description: 'Breathable tech-cotton blend with binary-patterned embroidery. Geometric silhouette for the modern avatar.',
    colors: ['#FFFFFF', '#000000'],
    type: 'Kurtis',
    subType: 'Straight Cut'
  },
  {
    id: 'w3',
    name: 'A-Line Prism Dress',
    price: 210.00,
    category: 'streetwear',
    subCategory: 'apparel',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    description: 'Lightweight A-line structure that reflects ambient light in a spectrum of neon colors.',
    colors: ['#C0C0C0'],
    type: 'Dresses',
    subType: 'A-Line'
  },
  {
    id: 'w4',
    name: 'Glitch Palazzo Ensemble',
    price: 125.00,
    category: 'ethnic',
    subCategory: 'apparel',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1627483262769-04d0a140148e?auto=format&fit=crop&q=80&w=800',
    description: 'Wide-leg palazzo with a high-definition glitch print. Comes with a cropped tech-silk camisole.',
    colors: ['#000000', '#4B0082'],
    type: 'Kurtis',
    subType: 'Palazzo Set'
  },
  {
    id: '2',
    name: 'Neon Flux Evening Gown',
    price: 899.00,
    category: 'formal',
    subCategory: 'apparel',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1539109132314-3477524c859c?auto=format&fit=crop&q=80&w=800',
    description: 'Silk-blend dress infused with micro-LED fibers for a subtle, controllable glow via the May app.',
    colors: ['#FFFFFF', '#FF1493', '#00BFFF'],
    threeDModel: 'apparel',
    type: 'Western Wear',
    subType: 'Gowns'
  },
  {
    id: '3',
    name: 'Holo-Tech Street Sneakers',
    price: 185.50,
    category: 'streetwear',
    subCategory: 'footwear',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-light sneakers with augmented reality tracking for performance analytics and holographic patterns.',
    colors: ['#C0C0C0', '#000000'],
    threeDModel: 'footwear',
    type: 'Runners',
    subType: 'Tech Sneakers'
  },
  {
    id: '4',
    name: 'Binary Peak Backpack',
    price: 120.00,
    category: 'accessories',
    subCategory: 'accessories',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    description: 'Anti-theft backpack with integrated power bank and solar charging panels.',
    colors: ['#2F4F4F', '#000000'],
    threeDModel: 'accessories',
    type: 'Bags',
    subType: 'Solar Packs'
  },
  {
    id: '5',
    name: 'Matrix Grid Blazer',
    price: 450.00,
    category: 'formal',
    subCategory: 'outerwear',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    description: 'Smart-tailored blazer with integrated haptic feedback for posture correction.',
    colors: ['#1C1C1C', '#4A4A4A'],
    threeDModel: 'outerwear',
    type: 'Blazers',
    subType: 'Smart Blazers'
  },
  {
    id: '6',
    name: 'Cyber-Bustier Top',
    price: 135.00,
    category: 'techwear',
    subCategory: 'apparel',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    description: '3D-printed structured top with moisture-wicking synthetic silk lining.',
    colors: ['#000000', '#FFFFFF'],
    threeDModel: 'apparel',
    type: 'Western Wear',
    subType: 'Tops'
  },
  {
    id: '7',
    name: 'Pulse Wave Boots',
    price: 320.00,
    category: 'techwear',
    subCategory: 'footwear',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    description: 'Platform boots with integrated shock-absorption and neon light strips.',
    colors: ['#000000', '#Fuchsia'],
    threeDModel: 'footwear',
    type: 'Boots',
    subType: 'Cyber Boots'
  },
  {
    id: '8',
    name: 'Neural Link Smartwatch',
    price: 599.00,
    category: 'accessories',
    subCategory: 'accessories',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    description: 'Biometric tracking watch with a flexible OLED display and AI styling assistant.',
    colors: ['#333333', '#C0C0C0'],
    threeDModel: 'accessories',
    type: 'Wearables',
    subType: 'Neural Trackers'
  },
  {
    id: '9',
    name: 'Junior Spark Tech-Hoodie',
    price: 85.00,
    category: 'streetwear',
    subCategory: 'apparel',
    gender: 'kids',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=800',
    description: 'Anti-stain nanotechnology fabric with glow-in-the-dark stitching for active juniors.',
    colors: ['#FFD700', '#000000'],
    threeDModel: 'apparel',
    type: 'Hoodies',
    subType: 'Nanotech'
  },
  {
    id: '10',
    name: 'Tiny Vanguard Joggers',
    price: 65.00,
    category: 'techwear',
    subCategory: 'apparel',
    gender: 'kids',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800',
    description: 'Reinforced knee pads with lightweight, breathable mesh. Perfect for playground high-performance.',
    colors: ['#4B0082', '#32CD32'],
    threeDModel: 'apparel',
    type: 'Bottoms',
    subType: 'Active'
  }
];

export const CATEGORY_STRUCTURE = {
  women: {
    apparel: [
      {
        id: 'kurtis',
        name: 'Kurtis',
        subTypes: ['Kurta Sets', 'Straight Cut', 'A-Line', 'Palazzo Set']
      },
      {
        id: 'western_wear',
        name: 'Western Wear',
        subTypes: ['Tops', 'Tees', 'Gowns', 'Jeans']
      },
      {
        id: 'dresses',
        name: 'Dresses',
        subTypes: ['Mini', 'Maxi', 'A-Line', 'Bodycon']
      }
    ],
    footwear: [
      { id: 'heels', name: 'Heels', subTypes: ['Stilettos', 'Blocks', 'Wedges'] },
      { id: 'boots', name: 'Boots', subTypes: ['Cyber Boots', 'Ankle Boots'] }
    ],
    accessories: [
      { id: 'bags', name: 'Bags', subTypes: ['Handbags', 'Clutches', 'Tech Totes'] }
    ],
    outerwear: [
      { id: 'jackets', name: 'Jackets', subTypes: ['Blazers', 'Windbreakers'] }
    ]
  },
  men: {
    apparel: [
      { id: 'shirts', name: 'Shirts', subTypes: ['Formal', 'Casual', 'Tech'] },
      { id: 't-shirts', name: 'T-Shirts', subTypes: ['Polos', 'Oversized', 'Graphic'] },
      { id: 'ethnic', name: 'Ethnic', subTypes: ['Kurta', 'Sherwani'] }
    ],
    footwear: [
      { id: 'sneakers', name: 'Sneakers', subTypes: ['Tech Sneakers', 'Casual Runners'] }
    ],
    accessories: [
      { id: 'watches', name: 'Watches', subTypes: ['Neural Trackers', 'Analog'] }
    ],
    outerwear: [
      { id: 'jackets', name: 'Jackets', subTypes: ['Tech Shell', 'Parkas'] }
    ]
  },
  kids: {
    apparel: [
      { id: 'boys', name: 'Boys', subTypes: ['Tees', 'Bottoms'] },
      { id: 'girls', name: 'Girls', subTypes: ['Dresses', 'Tops'] }
    ],
    footwear: [
      { id: 'kids_shoes', name: 'Shoes', subTypes: ['Active', 'Casual'] }
    ],
    accessories: [],
    outerwear: []
  }
};

export const LOOKBOOKS: StyleLook[] = [
  {
    id: 'l1',
    title: 'Neon Noir',
    subtitle: 'After-hours Tech',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    description: 'A fusion of high-visibility accents and stealth silhouettes. Perfect for late-night metropolitan exploration.',
    productIds: ['1', '3']
  },
  {
    id: 'l2',
    title: 'Cyber Minimalist',
    subtitle: 'The 2077 Executive',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
    description: 'Clean lines meet advanced materials. This collection focuses on breathable tech-silks and smart-fabrics.',
    productIds: ['5', '2']
  },
  {
    id: 'l3',
    title: 'Urban Explorer',
    subtitle: 'Daily Commute 2.0',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
    description: 'Functional apparel for the modern nomad. Integrated solar charging and modular storage.',
    productIds: ['1', '4']
  }
];

export const SUB_CATEGORIES = [
  { id: 'all', name: 'All', icon: <Layers size={20} /> },
  { id: 'apparel', name: 'Apparel', icon: <Shirt size={20} /> },
  { id: 'footwear', name: 'Footwear', icon: <Footprints size={20} /> },
  { id: 'accessories', name: 'Accessories', icon: <Watch size={20} /> },
  { id: 'outerwear', name: 'Outerwear', icon: <Wind size={20} /> },
];

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: <ShoppingBag size={24} /> },
  { id: 'inspiration', label: 'Trends', icon: <Sparkles size={24} /> },
  { id: 'help', label: 'Help', icon: <HelpCircle size={24} /> },
  { id: 'profile', label: 'Me', icon: <User size={24} /> },
];
