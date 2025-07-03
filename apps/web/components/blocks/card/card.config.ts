import { BlockGroup } from "@dndbuilder.com/react";
import { createBlockConfig } from "@dndbuilder.com/react/utils";
import { lazy } from "react";
import { LuCreditCard } from "react-icons/lu";
import { CardSettingsType } from "./types";
import { FiSquare } from "react-icons/fi";

const CardConfig = createBlockConfig<CardSettingsType>({
  type: "card", // Custom block type
  label: "Card",
  icon: FiSquare,
  component: lazy(() => import("./components/card.block")),
  isVisible: () => true,
  group: "Custom", // Group under Basic blocks
  settings: {},
  style: ({ settings, breakpoints }) => {
    return {};
  },
  controls: [
    {
      label: "Style",
      component: lazy(() => import("./components/card-style.control")),
    },
    {
      label: "Content",
      component: lazy(() => import("./components/card-content.control")),
    },
  ],
});

export default CardConfig;
