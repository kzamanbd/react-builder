import { ContainerConfig } from "@/blocks/container";
import { TabsConfig } from "@/blocks/tabs";
import { registerEditorBlocks } from "@/core";

export const BlockConfiguration = registerEditorBlocks([
  ContainerConfig,
  TabsConfig,
]);
