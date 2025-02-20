import { Block } from "@/types/block";
import { ReactNode } from "react";

export const enum TemplatePartType {
  HEADER = "header",
  FOOTER = "footer",
}

export type TemplatePart = {
  id: string;
  name: string;
  type: TemplatePartType;
  content: Record<string, Block>;
  themeId: string;
  templateId?: string;
};

export type TemplatePartTypeConfig = {
  label: string;
  key: TemplatePartType;
  icon: ReactNode;
};

export type TemplatePartLabel = "Header" | "Footer";
