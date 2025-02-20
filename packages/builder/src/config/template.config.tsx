import { TemplateType } from "@/types/template";
import { AiOutlineApartment, AiOutlineProduct } from "react-icons/ai";
import { FiBox, FiHome, FiShoppingBag } from "react-icons/fi";
import { RiStore2Line } from "react-icons/ri";
import { registerTemplateTypes } from "../core";
import { HiOutlineCollection } from "react-icons/hi";

export const TemplateConfig = registerTemplateTypes([
  {
    label: "Home",
    key: TemplateType.HOME,
    icon: <FiHome />,
  },
  {
    label: "Shop",
    key: TemplateType.SHOP,
    icon: <FiShoppingBag />,
  },
  {
    label: "Category",
    key: TemplateType.CATEGORY,
    icon: <AiOutlineApartment />,
  },
  {
    label: "Single Product",
    key: TemplateType.SINGLE_PRODUCT,
    icon: <FiBox />,
  },
  {
    label: "Single Category",
    key: TemplateType.SINGLE_CATEGORY,
    icon: <AiOutlineProduct />,
  },
  {
    label: "Single Collection",
    key: TemplateType.SINGLE_COLLECTION,
    icon: <HiOutlineCollection />,
  },

  // {
  //   label: 'Cart',
  //   key: TemplateType.CART,
  //   icon: <FiShoppingCart />,
  // },
  // {
  //   label: 'Checkout',
  //   key: TemplateType.CHECKOUT,
  //   icon: <MdShoppingCartCheckout />,
  // },
  // {
  //   label: 'Page',
  //   key: TemplateType.PAGE,
  //   icon: <FiFile />,
  // },
  // {
  //   label: 'Stores',
  //   key: TemplateType.STORE,
  //   icon: <TbLayoutList />,
  // },
  {
    label: "Single Store",
    key: TemplateType.SINGLE_STORE,
    icon: <RiStore2Line />,
    isVisible: ({ isStandalone }) => !isStandalone,
  },
]);
