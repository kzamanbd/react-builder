import { ReactNode } from "react";
import { Block } from "@/types/block";

export const enum TemplateType {
  HOME = "home",
  SHOP = "shop",
  CATEGORY = "category",
  SINGLE_CATEGORY = "single-category",
  SINGLE_PRODUCT = "single-product",
  SINGLE_COLLECTION = "single-collection",
  CART = "cart",
  CHECKOUT = "checkout",
  PAGE = "page",
  STORE = "store",
  SINGLE_STORE = "single-store",
}

export type Template = {
  id: string;
  name: string;
  type: TemplateType;
  content: Record<string, Block>;
};

export type TemplateTypeConfig = {
  label: string;
  key: TemplateType;
  icon: ReactNode;
  isVisible?: (params: { isStandalone: boolean }) => boolean;
};

export type TemplateLabel =
  | "Home"
  | "Shop"
  | "Category"
  | "Single Product"
  | "Cart"
  | "Checkout"
  | "Page"
  | "Stores"
  | "Single Store";
