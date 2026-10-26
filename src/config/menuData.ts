/**
 * BIN RESTO — editable menu.
 * SAMPLE CONTENT: names, descriptions and prices are placeholders until the owner
 * confirms the real menu. Add, rename or remove categories and items freely.
 * Images live in src/assets — replace files or point `image` to a new import.
 */
import samosa from "@/assets/samosa.jpg";
import doughnut from "@/assets/doughnut.jpg";
import burger from "@/assets/burger.jpg";
import sandwich from "@/assets/sandwich.jpg";
import fries from "@/assets/fries.jpg";
import dessert from "@/assets/dessert.jpg";
import drink from "@/assets/drink.jpg";
import hero from "@/assets/hero.jpg";

export type Availability = "available" | "ask" | "unavailable";
export type Tag = "bestseller" | "offer" | "chef";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // RWF — sample value
  category: string; // must match a category id
  image: string;
  availability: Availability;
  tags?: Tag[];
}

export const categories: { id: string; name: string }[] = [
  { id: "samosas", name: "Samosas" },
  { id: "amore", name: "Amore" }, // confirm exact spelling & products with the owner
  { id: "doughnuts", name: "Doughnuts" },
  { id: "fast-food", name: "Fast Food" },
  { id: "burgers", name: "Burgers" },
  { id: "sandwiches", name: "Sandwiches" },
  { id: "fries", name: "Fries & Sides" },
  { id: "snacks", name: "Snacks" },
  { id: "desserts", name: "Desserts" },
  { id: "beverages", name: "Beverages" },
  { id: "offers", name: "Special Offers" },
  { id: "chef", name: "Chef's Specials" },
];

export const menuItems: MenuItem[] = [
  { id: "beef-samosa", name: "Beef Samosa", description: "Crisp golden pastry filled with spiced minced beef and fresh herbs.", price: 500, category: "samosas", image: samosa, availability: "ask", tags: ["bestseller"] },
  { id: "veg-samosa", name: "Vegetable Samosa", description: "Peas, potato and gentle spices, served with mint chutney.", price: 400, category: "samosas", image: samosa, availability: "ask" },
  { id: "amore-box", name: "Amore Sweet Box", description: "A curated box of house sweet treats — contents confirmed daily.", price: 3000, category: "amore", image: doughnut, availability: "ask", tags: ["offer"] },
  { id: "choc-doughnut", name: "Chocolate Pistachio Doughnut", description: "Soft brioche ring, dark chocolate glaze, roasted pistachio.", price: 1200, category: "doughnuts", image: doughnut, availability: "ask", tags: ["bestseller"] },
  { id: "vanilla-doughnut", name: "Vanilla Glaze Doughnut", description: "Light, airy and finished with a silky vanilla glaze.", price: 1000, category: "doughnuts", image: doughnut, availability: "ask" },
  { id: "resto-platter", name: "Resto Fast Platter", description: "Burger, fries and samosas — a generous plate to share.", price: 8500, category: "fast-food", image: hero, availability: "ask", tags: ["offer"] },
  { id: "classic-burger", name: "Classic Cheese Burger", description: "Grilled beef patty, melted cheddar, caramelised onion, brioche bun.", price: 5500, category: "burgers", image: burger, availability: "ask", tags: ["bestseller"] },
  { id: "double-burger", name: "Double Stack Burger", description: "Two patties, double cheese, house sauce. For the truly hungry.", price: 7500, category: "burgers", image: burger, availability: "ask", tags: ["chef"] },
  { id: "club-sandwich", name: "Club Sandwich", description: "Toasted layers of chicken, crisp bacon, tomato and lettuce.", price: 4500, category: "sandwiches", image: sandwich, availability: "ask", tags: ["bestseller"] },
  { id: "chicken-sandwich", name: "Grilled Chicken Sandwich", description: "Herb-marinated chicken, garlic mayo, fresh greens.", price: 4000, category: "sandwiches", image: sandwich, availability: "ask" },
  { id: "golden-fries", name: "Golden Fries", description: "Hand-cut and twice-fried, served with two dips.", price: 2000, category: "fries", image: fries, availability: "ask" },
  { id: "snack-trio", name: "Snack Trio", description: "Samosa, mini fries and a dip — the perfect afternoon bite.", price: 2500, category: "snacks", image: samosa, availability: "ask" },
  { id: "choc-cake", name: "Dark Chocolate Gâteau", description: "Layered chocolate mousse cake with berries and gold leaf.", price: 3500, category: "desserts", image: dessert, availability: "ask", tags: ["chef"] },
  { id: "passion-juice", name: "Fresh Passion Juice", description: "Pressed passion fruit with a hint of mint.", price: 1500, category: "beverages", image: drink, availability: "ask" },
  { id: "iced-coffee", name: "Iced Rwandan Coffee", description: "Rwandan coffee poured over ice and fresh milk.", price: 2500, category: "beverages", image: drink, availability: "ask", tags: ["bestseller"] },
  { id: "duo-offer", name: "Burger & Juice Duo", description: "Classic burger with a fresh juice — sample promotion.", price: 6500, category: "offers", image: burger, availability: "ask", tags: ["offer"] },
  { id: "chef-plate", name: "Chef's Signature Plate", description: "The chef's daily creation — ask our team what's on today.", price: 9000, category: "chef", image: hero, availability: "ask", tags: ["chef"] },
];

export const availabilityLabel: Record<Availability, string> = {
  available: "Available today",
  ask: "Ask for today's availability",
  unavailable: "Not available",
};

export const tagLabel: Record<Tag, string> = {
  bestseller: "Bestseller",
  offer: "Special offer",
  chef: "Chef's special",
};
