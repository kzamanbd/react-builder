import { Block, BlockConfig } from "@/types/block";
import { AnyObject, OptionalKeys } from "@/types";
import { init } from "@paralleldrive/cuid2";
import { create } from "free-style";
import { startCase } from "lodash";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


// Export all utility functions and types
export * from './block';
export * from './guard';
export * from './popover';
export * from './style';
export * from './theme';


/**
 * Creates a unique ID generator with a specified length
 * @returns A function that generates unique IDs
 */
export const createId = init({
  length: 8,
});

/**
 * Creates a root block for the page builder
 * @returns A root block object with default properties
 */
export const createRootBlock = () => {
  return {
    id: "root",
    type: "root",
    parentId: "",
    children: [],
    settings: {},
  };
};

/**
 * Creates a content object from an array of blocks
 * @param blocks - Array of blocks to include in the content
 * @returns A content object with blocks organized by ID and parent-child relationships
 */
export const createContent = (blocks: Block[]) => {
  const content: Record<string, Block> = {
    ["root"]: createRootBlock(),
  };

  // Add block data to content
  blocks.forEach((block) => {
    content[block.id] = block;
  });

  // Add the block to the parent's children
  blocks.forEach((block) => {
    content[block.parentId].children.push(block.id);
  });

  return content;
};

/**
 * Checks if the content has no blocks (empty)
 * @param content - The content object to check
 * @returns True if the content has no blocks, false otherwise
 */
export const isEmptyContent = (content: Record<string, Block>) => {
  return !content.root.children.length;
};

/**
 * Creates a block with default values for optional properties
 * @param config - The block configuration
 * @returns A block object with all required properties
 */
export const createBlock = <T extends object = AnyObject>(
  config: OptionalKeys<Block<T>, "id" | "children">
) => {
  return {
    id: config.id ?? createId(),
    children: config.children ?? [],
    ...config,
  };
};

/**
 * Creates a block configuration with default values for optional properties
 * @param config - The block configuration options
 * @returns A complete block configuration with all required properties
 */
export const createBlockConfig = <T extends object>(
  config: OptionalKeys<BlockConfig<T>, "label" | "settings" | "controls">
) => {
  return {
    label: config.label ?? startCase(config.type),
    settings: config.settings ?? {},
    controls: config.controls ?? [],
    ...config,
  };
};

/**
 * Creates a style utility for registering and retrieving styles
 * @returns An object with register and get methods for managing styles
 */
export const createStyle = () => {
  const style = create();
  const register = style.registerStyle.bind(style);
  const get = style.getStyles.bind(style);

  return {
    register,
    get,
  };
};

/**
 * Combines multiple class values and merges Tailwind classes
 * @param inputs - Class values to combine
 * @returns A string of combined and merged class names
 */
export function classNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Dynamically imports icon sets based on the provided icon set name
 * @param iconSet - The name of the icon set to import
 * @returns The imported icon set or undefined if not found
 */
export async function getIcons(iconSet: string) {
  switch (iconSet) {
    // case 'ai': {
    //   const icons = await import('react-icons/ai');
    //   return icons;
    // }
    // case "fi": {
    //   const icons = await import("react-icons/fi");
    //   return icons;
    // }
    // case "fa6": {
    //   const icons = await import("react-icons/fa6");
    //   return icons;
    // }
    // case 'hi2': {
    //   const icons = await import('react-icons/hi2');
    //   return icons;
    // }
    // case 'md': {
    //   const icons = await import('react-icons/md');
    //   return icons;
    // }
    // case 'bs': {
    //   const icons = await import('react-icons/bs');
    //   return icons;
    // }
    // case 'io5': {
    //   const icons = await import('react-icons/io5');
    //   return icons;
    // }
    default:
      break;
  }
}

/**
 * Sorts an array of items based on a provided order of IDs
 * @param ids - Array of IDs defining the desired order
 * @param data - Array of items to be sorted
 * @returns A new sorted array of items
 */
export function sortRepeatableItems(ids: string[], data: any[]) {
  if (!ids.length || !data.length) {
    return data;
  }

  const orderMap = new Map(ids.map((id, index) => [id, index]));
  return data.sort((a, b) => {
    const indexA = orderMap.get(a.id);
    const indexB = orderMap.get(b.id);

    // If both items are in the map, sort by their position
    if (indexA !== undefined && indexB !== undefined) {
      return indexA - indexB;
    }

    // If only one item is in the map, prioritize it
    if (indexA !== undefined) return -1;
    if (indexB !== undefined) return 1;

    // If neither item is in the map, maintain their relative order
    return 0;
  });
}

/**
 * Type-safe version of Object.keys that preserves the key types
 * @param obj - The object to get keys from
 * @returns An array of the object's keys with proper typing
 */
export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * Converts a singular word to its plural form following English grammar rules
 * @param word - The singular word to pluralize
 * @returns The pluralized form of the word
 */
export const pluralize = <T extends string>(word: T) => {
  if (word.endsWith("y") && !["a", "e", "i", "o", "u"].includes(word[word.length - 2])) {
    return word.slice(0, -1) + "ies";
  } else if (
    word.endsWith("s") ||
    word.endsWith("x") ||
    word.endsWith("z") ||
    word.endsWith("sh") ||
    word.endsWith("ch")
  ) {
    return word + "es";
  } else {
    return word + "s";
  }
};

/**
 * Converts a plural word to its singular form following English grammar rules
 * @param word - The plural word to singularize
 * @returns The singular form of the word
 */
export const singularize = <T extends string>(word: T) => {
  if (word.endsWith("ies")) {
    return word.slice(0, -3) + "y";
  } else if (
    word.endsWith("ses") ||
    word.endsWith("xes") ||
    word.endsWith("zes") ||
    word.endsWith("shes") ||
    word.endsWith("ches")
  ) {
    return word.slice(0, -2);
  } else {
    return word.slice(0, -1);
  }
};

/**
 * Converts bytes to a human-readable file size string
 * @param bytes - The size in bytes
 * @returns A formatted string representing the size (e.g., "1.5 MB")
 */
export function bytesToSize(bytes: number): string {
  const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Generates a URL for an image from a path
 * @param path - The path to the image
 * @returns The URL for the image
 */
export const generateImageUrl = (path: string) => {
  return path;
};

/**
 * Converts a file to a base64 string
 * @param file The file to convert
 * @returns A promise that resolves to the base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Converts an image URL to a base64 string
 * @param url The URL of the image
 * @returns A promise that resolves to the base64 string
 */
export const urlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return await fileToBase64(blob as File);
  } catch (error) {
    console.error("Error converting URL to base64:", error);
    throw error;
  }
};

/**
 * Generates a unique ID for media items
 * @returns A unique ID string
 */
export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

