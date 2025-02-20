import { BlockGroup } from "@/types/block";
import { registerGroupConfig } from "@/core";

export const GroupConfiguration = registerGroupConfig([
  {
    label: BlockGroup.TEMPLATE,
    order: 1,
    isVisible: ({ resourceType }) => resourceType === "templates",
  },
  {
    label: BlockGroup.TEMPLATE_PART,
    order: 2,
    isVisible: ({ resourceType }) => resourceType === "template-parts",
  },
  {
    label: BlockGroup.BASIC,
    order: 3,
  },
  {
    label: BlockGroup.LAYOUT,
    order: 4,
  },
  {
    label: BlockGroup.ECOMMERCE,
    order: 5,
  },
  {
    label: BlockGroup.SITE,
    order: 6,
  },
  {
    label: BlockGroup.ADVANCED,
    order: 7,
  },
  {
    label: BlockGroup.OTHERS,
    order: 8,
  },
]);
