export interface Cookie {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isFeatured: boolean;
  isAvailable: boolean;
  ingredients: string[];
  allergens: string[];
}

export const mockCookies: Cookie[] = [
  {
    id: "1",
    name: "Classic Chocolate Chip",
    description: "Our signature chocolate chip cookie, soft and chewy with rich chocolate chunks.",
    price: 2.50,
    imageUrl: "/placeholder.svg", // Using a placeholder for now
    isFeatured: true,
    isAvailable: true,
    ingredients: ["Flour", "Butter", "Sugar", "Brown Sugar", "Eggs", "Chocolate Chips", "Baking Soda", "Salt"],
    allergens: ["Gluten", "Dairy", "Eggs"],
  },
  {
    id: "2",
    name: "Oatmeal Raisin",
    description: "Hearty oatmeal cookies packed with plump raisins and a hint of cinnamon.",
    price: 2.25,
    imageUrl: "/placeholder.svg",
    isFeatured: false,
    isAvailable: true,
    ingredients: ["Flour", "Oats", "Butter", "Sugar", "Brown Sugar", "Eggs", "Raisins", "Cinnamon", "Baking Soda", "Salt"],
    allergens: ["Gluten", "Dairy", "Eggs"],
  },
  {
    id: "3",
    name: "Peanut Butter Delight",
    description: "Rich and creamy peanut butter cookies, a classic favorite.",
    price: 2.75,
    imageUrl: "/placeholder.svg",
    isFeatured: true,
    isAvailable: true,
    ingredients: ["Flour", "Peanut Butter", "Butter", "Sugar", "Brown Sugar", "Eggs", "Baking Soda", "Salt"],
    allergens: ["Gluten", "Dairy", "Eggs", "Peanuts"],
  },
  {
    id: "4",
    name: "Sugar Cookie",
    description: "Simple yet delicious sugar cookies, perfect for decorating.",
    price: 2.00,
    imageUrl: "/placeholder.svg",
    isFeatured: false,
    isAvailable: true,
    ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Vanilla Extract", "Baking Powder", "Salt"],
    allergens: ["Gluten", "Dairy", "Eggs"],
  },
  {
    id: "5",
    name: "Double Chocolate Fudge",
    description: "For the true chocolate lover, a decadent double chocolate cookie with fudge chunks.",
    price: 3.00,
    imageUrl: "/placeholder.svg",
    isFeatured: true,
    isAvailable: true,
    ingredients: ["Flour", "Cocoa Powder", "Butter", "Sugar", "Eggs", "Chocolate Chunks", "Baking Soda", "Salt"],
    allergens: ["Gluten", "Dairy", "Eggs"],
  },
];