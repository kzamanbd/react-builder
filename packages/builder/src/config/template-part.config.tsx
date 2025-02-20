import {
  TemplatePartType,
  TemplatePartTypeConfig,
} from "@/types/template-part";
import { BsLayoutSidebar } from "react-icons/bs";

export const TemplatePartConfig: { types: TemplatePartTypeConfig[] } = {
  types: [
    {
      label: "Header",
      key: TemplatePartType.HEADER,
      icon: <BsLayoutSidebar size={16} className="rotate-90 stroke-[0.5]" />,
    },
    {
      label: "Footer",
      key: TemplatePartType.FOOTER,
      icon: <BsLayoutSidebar size={16} className="-rotate-90 stroke-[0.5]" />,
    },
  ],
};
