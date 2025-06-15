import { PreviewBlockConfig } from "./types/block";

export function registerPreviewBlocks(configurations: PreviewBlockConfig[]) {
  const configMap = configurations.reduce(
    (acc, config) => {
      if (acc[config.type]) {
        throw new Error(`Block type "${config.type}" already reigstered`);
      }

      acc[config.type] = config;
      return acc;
    },
    {} as Record<string, PreviewBlockConfig>
  );

  return {
    getConfig() {
      return configMap;
    },

    getBlock(type: string): PreviewBlockConfig | undefined {
      return configMap[type];
    },
  };
}
