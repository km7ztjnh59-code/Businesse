export type CategoryType = 'all' | 'cakes' | 'brownies' | 'cupcakes' | 'bento' | 'cookies';

export type PageType = 'home' | 'menu' | 'summary' | 'payment';

export interface WeightOption {
  id: string;
  label: string; // e.g. "0.5 kg (Bento)" or "Box of 6"
  sublabel: string; // e.g. "Serves 1-2"
  multiplier: number; // base price * multiplier
  isDefault?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'cakes' | 'brownies' | 'cupcakes' | 'bento' | 'cookies';
  price: number; // Base price (usually 1kg for cakes, 6-pack for brownies)
  description: string;
  servingSize: string;
  image: string;
  tags?: string[];
  isEgglessAvailable: boolean;
  leadTimeHours: number;
  popular?: boolean;
  ingredients?: string[];
  weightOptions: WeightOption[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  isEggless: boolean;
  customNote?: string;
}

export interface CustomizedOrderItem {
  id: string; // unique id
  productId: string;
  productName: string;
  category: string;
  image: string;
  selectedWeight: WeightOption;
  isEggless: boolean;
  customMessage: string;
  selectedStyle?: string;
  flavorVariant?: string;
  specialNote?: string;
  unitPrice: number; // dynamically calculated based on weight & customizations
  quantity: number;
  totalPrice: number;
}

export interface CakeCustomization {
  flavor: string;
  sizeKg: number;
  isEggless: boolean;
  style: string;
  messageOnCake: string;
  deliveryDate: string;
  specialRequests: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  deliveryType: 'delivery' | 'pickup';
  address: string;
  specialInstructions: string;
}

export interface CompletedOrder {
  orderId: string;
  items: CustomizedOrderItem[];
  customer: CustomerDetails;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  paymentRef: string;
  paidAt: string;
  status: 'confirmed';
}

export interface Testimonial {
  id: string;
  name: string;
  occasion: string;
  comment: string;
  rating: number;
  cakeOrdered: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: 'ordering' | 'ingredients' | 'delivery';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  department: string;
  bio: string;
  responsibilities: string[];
}
