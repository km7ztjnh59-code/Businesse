import { MenuItem, Testimonial, GalleryItem, FAQ, WeightOption } from '../types';

export const BAKERY_INFO = {
  name: "Jerryyss Bakery",
  tagline: "Fresh-baked, made-to-order treats — baked daily, delivered locally",
  motto: "Little treats. Big happiness.",
  chefName: "KHAN NOOR",
  whatsappNumber: "+919372507748",
  displayPhone: "+91 93725 07748",
  email: "hello@jerryyssbakery.com",
  instagram: "@jerrys_bakeryy",
  instagramUrl: "https://www.instagram.com/jerrys_bakeryy?stkn=Y3JocWx6MTVmb2xv",
  location: "Bakehouse Kitchen, Local Delivery Area",
  hours: "Monday – Saturday: 8:00 AM – 7:30 PM (Sunday: 9:00 AM – 4:00 PM)",
  leadTimeNotice: "Please order at least 24–48 hours in advance for celebration cakes.",
};

export const FALLBACK_CAKE_IMAGE = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';

export const CAKE_WEIGHT_OPTIONS: WeightOption[] = [
  { id: '0.5kg', label: '0.5 kg (Bento / Petite)', sublabel: 'Serves 2-3', multiplier: 0.58 },
  { id: '1.0kg', label: '1.0 kg (Classic Round)', sublabel: 'Serves 6-8', multiplier: 1.0, isDefault: true },
  { id: '1.5kg', label: '1.5 kg (Family Party)', sublabel: 'Serves 10-12', multiplier: 1.45 },
  { id: '2.0kg', label: '2.0 kg (Grand Feast)', sublabel: 'Serves 14-18', multiplier: 1.9 },
  { id: '2.5kg', label: '2.5 kg (2-Tier Elegance)', sublabel: 'Serves 20-25', multiplier: 2.35 },
];

export const BENTO_WEIGHT_OPTIONS: WeightOption[] = [
  { id: '350g', label: '350g (Single Treat Bento)', sublabel: 'Serves 1 person', multiplier: 0.8 },
  { id: '500g', label: '500g (Classic 4-inch Bento)', sublabel: 'Serves 2 people', multiplier: 1.0, isDefault: true },
  { id: '750g', label: '750g (Sharing Bento)', sublabel: 'Serves 3-4 people', multiplier: 1.45 },
];

export const BROWNIE_WEIGHT_OPTIONS: WeightOption[] = [
  { id: 'box4', label: 'Box of 4 Large Squares', sublabel: 'Personal Treat', multiplier: 0.72 },
  { id: 'box6', label: 'Box of 6 (Signature Box)', sublabel: 'Family Share', multiplier: 1.0, isDefault: true },
  { id: 'box9', label: 'Box of 9 Big Squares', sublabel: 'Party Slab', multiplier: 1.45 },
  { id: 'box12', label: 'Box of 12 Mega Box', sublabel: 'Celebration Pack', multiplier: 1.88 },
];

export const CUPCAKE_WEIGHT_OPTIONS: WeightOption[] = [
  { id: 'cup4', label: 'Box of 4 Cupcakes', sublabel: 'Sweet Duo/Trio', multiplier: 0.72 },
  { id: 'cup6', label: 'Box of 6 Assorted Box', sublabel: 'Classic Selection', multiplier: 1.0, isDefault: true },
  { id: 'cup12', label: 'Box of 12 Party Platter', sublabel: 'Celebration Assortment', multiplier: 1.85 },
];

export const COOKIE_WEIGHT_OPTIONS: WeightOption[] = [
  { id: 'pack4', label: 'Pack of 4 Palm-sized', sublabel: 'Crisp & Chewy', multiplier: 1.0, isDefault: true },
  { id: 'pack8', label: 'Pack of 8 Cookie Box', sublabel: 'Sharing Goodness', multiplier: 1.85 },
  { id: 'pack12', label: 'Pack of 12 Big Jar', sublabel: 'Cookie Lovers Pack', multiplier: 2.65 },
];

export const DECORATION_STYLES = [
  { id: 'minimalist', name: 'Minimalist Korean Pastel', priceAddon: 0, desc: 'Silky smooth pastel buttercream with clean aesthetic' },
  { id: 'ganache-drip', name: 'Dark Chocolate Ganache Drip', priceAddon: 80, desc: 'Glossy chocolate drip crowned with fresh berries & crumbs' },
  { id: 'vintage-lambeth', name: 'Vintage Lambeth Piping', priceAddon: 120, desc: 'Detailed heritage frills, ornate borders & delicate rosettes' },
  { id: 'rustic-floral', name: 'Rustic Naked with Fresh Florals', priceAddon: 100, desc: 'Semi-naked crumb coat with fresh organic flowers' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'cake-belgian-truffle',
    name: 'Belgian Chocolate Truffle Cake',
    category: 'cakes',
    price: 1200,
    description: 'Ultra-moist chocolate sponge layered with rich 55% Belgian chocolate ganache, crowned with dark chocolate shards and fresh raspberries.',
    servingSize: 'Serves 6-8 (Base 1 kg)',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    tags: ['Bestseller', 'Signature', 'Chocoholic'],
    isEgglessAvailable: true,
    leadTimeHours: 24,
    popular: true,
    ingredients: ['Belgian Dark Chocolate', 'European Butter', 'Organic Flour', 'Dutch Cocoa', 'Fresh Cream'],
    weightOptions: CAKE_WEIGHT_OPTIONS
  },
  {
    id: 'cake-strawberries-cream',
    name: 'Vanilla Bean & Fresh Strawberry Cake',
    category: 'cakes',
    price: 1250,
    description: 'Tender Madagascar vanilla sponge paired with whipped mascarpone cream and layers of fresh, ripe local farm strawberries.',
    servingSize: 'Serves 6-8 (Base 1 kg)',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    tags: ['Customer Favorite', 'Light & Fresh'],
    isEgglessAvailable: true,
    leadTimeHours: 24,
    popular: true,
    ingredients: ['Madagascar Vanilla Bean', 'Fresh Strawberries', 'Mascarpone Cream', 'Pure Cane Sugar'],
    weightOptions: CAKE_WEIGHT_OPTIONS
  },
  {
    id: 'cake-red-velvet',
    name: 'Classic Southern Red Velvet',
    category: 'cakes',
    price: 1100,
    description: 'Velvety cocoa-infused crumb layered with our signature tangy Philadelphia cream cheese frosting and delicate red velvet crumbs.',
    servingSize: 'Serves 6-8 (Base 1 kg)',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80',
    tags: ['Classic', 'Celebration'],
    isEgglessAvailable: true,
    leadTimeHours: 24,
    popular: false,
    ingredients: ['Dutch Cocoa', 'Buttermilk', 'Cream Cheese', 'Pure Vanilla'],
    weightOptions: CAKE_WEIGHT_OPTIONS
  },
  {
    id: 'bento-pastel-dream',
    name: 'Minimalist Korean Bento Cake',
    category: 'bento',
    price: 450,
    description: 'Cute single/double serving lunchbox cake with smooth pastel buttercream and your customized handwritten piped message.',
    servingSize: 'Serves 1-2 (Base 500g)',
    image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=800&q=80',
    tags: ['Trending', 'Bento', 'Cute Gift'],
    isEgglessAvailable: true,
    leadTimeHours: 12,
    popular: true,
    ingredients: ['Soft Sponge', 'Swiss Meringue Buttercream', 'Fruit Compote'],
    weightOptions: BENTO_WEIGHT_OPTIONS
  },
  {
    id: 'brownie-fudge-box',
    name: 'Signature Fudgy Dark Brownie Box',
    category: 'brownies',
    price: 650,
    description: 'Crispy crackly top with dense, fudgy, melt-in-your-mouth chocolate center made with browned French butter and chunks of dark chocolate.',
    servingSize: 'Base Pack of 6 Large Squares',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    tags: ['Fudgy', 'Dark Chocolate', 'Top Seller'],
    isEgglessAvailable: true,
    leadTimeHours: 12,
    popular: true,
    ingredients: ['70% Dark Couverture Chocolate', 'Browned Butter', 'Brown Cane Sugar', 'Dutch Cocoa Powder'],
    weightOptions: BROWNIE_WEIGHT_OPTIONS
  },
  {
    id: 'brownie-caramel-biscoff',
    name: 'Salted Caramel & Biscoff Brownie Slab',
    category: 'brownies',
    price: 750,
    description: 'Our signature fudgy brownie swirled with homemade salted caramel sauce and topped with crunchy Lotus Biscoff spread and cookies.',
    servingSize: 'Base Pack of 6 Slices',
    image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
    tags: ['Caramel', 'Biscoff Crunchy'],
    isEgglessAvailable: true,
    leadTimeHours: 12,
    popular: false,
    ingredients: ['Lotus Biscoff Spread', 'Sea Salt Caramel', 'Dark Chocolate', 'Butter'],
    weightOptions: BROWNIE_WEIGHT_OPTIONS
  },
  {
    id: 'cupcake-artisan-box',
    name: 'Artisan Gourmet Cupcakes Box',
    category: 'cupcakes',
    price: 550,
    description: 'Assorted collection including Belgian chocolate swirl, Salted Caramel buttercream, and Madagascar Vanilla Berry blossom.',
    servingSize: 'Base Pack of 6 Pieces Assorted',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    tags: ['Assorted Box', 'Party Favorite'],
    isEgglessAvailable: true,
    leadTimeHours: 18,
    popular: true,
    ingredients: ['Fluffy Sponge', 'Italian Buttercream', 'Berry Reduction', 'Dark Chocolate Swirls'],
    weightOptions: CUPCAKE_WEIGHT_OPTIONS
  },
  {
    id: 'cookies-sea-salt-choc',
    name: 'Giant Gooey Sea Salt Choc-Chunk Cookies',
    category: 'cookies',
    price: 380,
    description: 'Golden edges with gooey, molten pools of dark and milk chocolate, sprinkled with Maldon flaky sea salt straight out of the oven.',
    servingSize: 'Base Pack of 4 Palm-sized Cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    tags: ['Gooey', 'Flaky Sea Salt'],
    isEgglessAvailable: true,
    leadTimeHours: 6,
    popular: true,
    ingredients: ['Belgian Chocolate Chunks', 'Maldon Flaky Salt', 'Cultured Butter', 'Brown Sugar'],
    weightOptions: COOKIE_WEIGHT_OPTIONS
  },
  {
    id: 'cake-biscoff-crunch',
    name: 'Lotus Biscoff Caramel Drip Cake',
    category: 'cakes',
    price: 1350,
    description: 'Spiced caramel biscuit sponge layered with smooth cookie butter frosting, melted Biscoff drip, and golden crushed Speculoos cookies.',
    servingSize: 'Serves 6-8 (Base 1 kg)',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    tags: ['Speculoos', 'Crowd Pleaser'],
    isEgglessAvailable: true,
    leadTimeHours: 24,
    popular: true,
    ingredients: ['Lotus Biscoff Biscuit Crumbs', 'Speculoos Buttercream', 'Vanilla Bean Sponge', 'Caramel Drip'],
    weightOptions: CAKE_WEIGHT_OPTIONS
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Pooja Sharma',
    occasion: 'Daughter\'s 5th Birthday',
    comment: 'The Belgian Chocolate cake was the star of our birthday party! Not overly sweet, delightfully rich, and beautifully decorated. Everyone asked where we got it!',
    rating: 5,
    cakeOrdered: 'Belgian Chocolate Truffle (1.5 kg)',
    date: 'Last week'
  },
  {
    id: 'rev-2',
    name: 'Rahul Mehta',
    occasion: 'Anniversary Celebration',
    comment: 'Ordered a custom eggless Bento cake with a handwritten anniversary note. The piping was immaculate and it tasted just like homemade perfection.',
    rating: 5,
    cakeOrdered: 'Minimalist Korean Bento (Eggless)',
    date: '2 weeks ago'
  },
  {
    id: 'rev-3',
    name: 'Ananya Verma',
    occasion: 'Weekend Family Gathering',
    comment: 'The fudgy brownies are dangerously addictive! Crispy crackly top and ultra gooey inside. We finished the entire box of 6 in one evening.',
    rating: 5,
    cakeOrdered: 'Signature Fudgy Brownie Box',
    date: '3 weeks ago'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Vintage Lambeth Birthday Cake',
    category: 'Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
    description: 'Intricate piped buttercream frills on dark chocolate sponge'
  },
  {
    id: 'gal-2',
    title: 'Pastel Korean Bento Gift Cake',
    category: 'Bento',
    image: 'https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?auto=format&fit=crop&w=900&q=80',
    description: 'Soft lavender buttercream with personalized cursive text'
  },
  {
    id: 'gal-3',
    title: 'Molten Sea Salt Chocolate Brownie',
    category: 'Brownies',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    description: 'Fresh out of the oven with golden browned butter and flaky sea salt'
  },
  {
    id: 'gal-4',
    title: 'Fresh Strawberry Mascarpone Tier',
    category: 'Cakes',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80',
    description: 'Local organic strawberries layered with whipped mascarpone'
  },
  {
    id: 'gal-5',
    title: 'Gourmet Swirled Cupcakes',
    category: 'Cupcakes',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=900&q=80',
    description: 'Assorted party collection with Italian meringue swirls'
  },
  {
    id: 'gal-6',
    title: 'Lotus Biscoff Caramel Drip',
    category: 'Cakes',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=900&q=80',
    description: 'Decadent cookie butter drips with Speculoos cookie crowns'
  }
];

export const FAQS: FAQ[] = [
  {
    question: "How much advance notice do you need?",
    answer: "For celebration cakes and custom designs, we kindly ask for 24 to 48 hours notice. Brownies, bento cakes, and cookies can frequently be accommodated on same-day or 12-hour notice depending on our daily bake schedule.",
    category: "ordering"
  },
  {
    question: "Do you make 100% eggless cakes?",
    answer: "Yes! Almost all of our cakes, brownies, cupcakes, and cookies can be baked 100% eggless upon request. We prepare eggless bakes using separate sanitized bowls and pans with zero compromise on moisture, texture, and flavor.",
    category: "ingredients"
  },
  {
    question: "How does local delivery and pickup work?",
    answer: "We offer careful, temperature-controlled local doorstep delivery within our city and surrounding neighborhoods. Free delivery is available on orders over ₹800 within 5 km. You are also welcome to arrange free contactless pickup from our bakehouse kitchen.",
    category: "delivery"
  },
  {
    question: "Can I customize the flavor, size, and message?",
    answer: "Absolutely! You can choose your desired weight (from 0.5 kg bento up to 2.5 kg tiers), flavor, dietary preference (standard or eggless), piping design style, and your own personalized piped message on the cake.",
    category: "ordering"
  },
  {
    question: "What ingredients do you use?",
    answer: "We believe honest ingredients make delicious treats. We use real cultured butter, pure Madagascar vanilla extract, premium Belgian and Dutch cocoa, farm eggs (or eggless curd & cream substitutes), and fresh seasonal fruit. We never use artificial preservatives or shortening.",
    category: "ingredients"
  }
];

export const CAKE_FLAVORS = [
  { id: 'belgian-choc', name: 'Belgian Chocolate Truffle', priceDelta: 0, desc: 'Rich, fudgy & deep chocolate ganache' },
  { id: 'vanilla-berry', name: 'Madagascar Vanilla & Fresh Berry', priceDelta: 100, desc: 'Fluffy sponge with fresh strawberry compote' },
  { id: 'red-velvet', name: 'Southern Red Velvet & Cream Cheese', priceDelta: 0, desc: 'Tangy classic with velvety texture' },
  { id: 'biscoff-crunch', name: 'Lotus Biscoff Salted Caramel', priceDelta: 150, desc: 'Caramel sponge with crunchy speculoos layers' },
  { id: 'choc-salted-caramel', name: 'Dark Chocolate Salted Caramel', priceDelta: 120, desc: 'Decadent chocolate with homemade sea-salt caramel' }
];

export const CAKE_SIZES = [
  { id: '0.5kg', label: 'Bento Mini (0.5 kg)', weight: '0.5 kg', serves: 'Serves 1-2 people', basePrice: 450 },
  { id: '1kg', label: 'Classic Round (1 kg)', weight: '1.0 kg', serves: 'Serves 6-8 people', basePrice: 950 },
  { id: '1.5kg', label: 'Family Party (1.5 kg)', weight: '1.5 kg', serves: 'Serves 10-14 people', basePrice: 1400 },
  { id: '2tier', label: 'Celebration 2-Tier (2.5 kg)', weight: '2.5 kg', serves: 'Serves 18-24 people', basePrice: 2400 }
];

export const CAKE_STYLES = [
  { id: 'minimalist', name: 'Minimalist Korean Style', desc: 'Soft pastel hues, smooth finish with cute cursive lettering' },
  { id: 'chocolate-drip', name: 'Signature Chocolate Drip', desc: 'Glossy ganache drip with chocolate curl crowns & fresh berries' },
  { id: 'vintage-piped', name: 'Vintage Lambeth Piped', desc: 'Elaborate frilled royal buttercream piping and delicate bows' },
  { id: 'rustic-naked', name: 'Rustic Semi-Naked', desc: 'Exposed sponge edges garnished with seasonal edible flowers' }
];
