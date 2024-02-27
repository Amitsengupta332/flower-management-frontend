import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

// type TSelectCategory = "Roses" | "Lilies" | "Sunflowers" | "Tulips" | "Orchids";

// export type TFlower = {
//   productName: string;
//   productQuantity: string;
//   price: string;
//   bloomDate: string;
//   color: string;
//   selectCategory?: TSelectCategory;
//   size: "s" | "m" | "l";
//   fragrance: "Rose" | "Lily" | "Jasmine" | "Lavender" | "Citrus";
//   _id: string;
// };
// export type FlowerDefaultValuesProps = {
//   _id?: string;
//   productName?: string;
//   productQuantity?: string;
//   price?: string;
//   quantity?: number;
//   bloomDate?: string | undefined;
//   color?: string;
//   selectCategory?: string;
//   size?: string;
//   fragrance?: string;
// };

export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};
