
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'streetwear' | 'formal' | 'techwear' | 'accessories' | 'ethnic';
  subCategory: 'apparel' | 'footwear' | 'accessories' | 'outerwear';
  gender: 'men' | 'women' | 'kids' | 'unisex';
  image: string;
  description: string;
  threeDModel?: string;
  colors: string[];
  type?: string; // e.g., 'Kurtis', 'Western Wear'
  subType?: string; // e.g., 'Kurta Sets', 'Straight Cut'
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface StyleLook {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  videoUrl?: string;
  description: string;
  productIds: string[];
}
