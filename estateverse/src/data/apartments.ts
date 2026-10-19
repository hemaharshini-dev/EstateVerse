export type Availability = "Available" | "Reserved" | "Sold";
export type Apartment = {
  id: string;
  tower: "Tower A" | "Tower B" | "Tower C";
  floor: number;
  position: number;
  bedrooms: 2 | 3;
  area: number;
  price: number;
  facing: "North" | "East" | "South" | "West";
  availability: Availability;
};

// Fictional sample inventory for the Aurelia Heights demo. Price is in lakh INR.
export const apartments: Apartment[] = [
  { id: "A-0402", tower: "Tower A", floor: 4, position: 0, bedrooms: 2, area: 1240, price: 72, facing: "East", availability: "Available" },
  { id: "A-0503", tower: "Tower A", floor: 5, position: 1, bedrooms: 3, area: 1685, price: 96, facing: "North", availability: "Reserved" },
  { id: "A-0701", tower: "Tower A", floor: 7, position: 2, bedrooms: 2, area: 1280, price: 78, facing: "West", availability: "Available" },
  { id: "A-0904", tower: "Tower A", floor: 9, position: 3, bedrooms: 3, area: 1720, price: 108, facing: "East", availability: "Available" },
  { id: "A-1102", tower: "Tower A", floor: 11, position: 4, bedrooms: 2, area: 1240, price: 88, facing: "South", availability: "Sold" },
  { id: "B-0401", tower: "Tower B", floor: 4, position: 0, bedrooms: 3, area: 1685, price: 99, facing: "North", availability: "Available" },
  { id: "B-0603", tower: "Tower B", floor: 6, position: 1, bedrooms: 2, area: 1240, price: 76, facing: "East", availability: "Available" },
  { id: "B-0802", tower: "Tower B", floor: 8, position: 2, bedrooms: 3, area: 1720, price: 112, facing: "West", availability: "Reserved" },
  { id: "B-1004", tower: "Tower B", floor: 10, position: 3, bedrooms: 2, area: 1280, price: 83, facing: "North", availability: "Available" },
  { id: "B-1201", tower: "Tower B", floor: 12, position: 4, bedrooms: 3, area: 1685, price: 124, facing: "South", availability: "Available" },
  { id: "C-0302", tower: "Tower C", floor: 3, position: 0, bedrooms: 2, area: 1240, price: 74, facing: "West", availability: "Available" },
  { id: "C-0504", tower: "Tower C", floor: 5, position: 1, bedrooms: 3, area: 1685, price: 101, facing: "East", availability: "Available" },
  { id: "C-0703", tower: "Tower C", floor: 7, position: 2, bedrooms: 2, area: 1280, price: 80, facing: "North", availability: "Reserved" },
  { id: "C-0901", tower: "Tower C", floor: 9, position: 3, bedrooms: 3, area: 1720, price: 118, facing: "South", availability: "Available" },
  { id: "C-1104", tower: "Tower C", floor: 11, position: 4, bedrooms: 2, area: 1240, price: 91, facing: "East", availability: "Available" },
];

export const formatPrice = (lakh: number) => lakh >= 100
  ? `₹${(lakh / 100).toFixed(2)} Cr`
  : `₹${lakh} L`;

