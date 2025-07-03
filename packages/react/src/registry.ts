import { BreakpointConfig, BuilderConfig } from "@/types";
import { BlockConfig } from "@/types/block";
import deepmerge from "deepmerge";

/**
 * Global registry for blocks, groups, and breakpoints
 * This is a singleton class that manages the registration and retrieval of blocks, groups, and breakpoints
 */
let registeredBlocks: Record<string, BlockConfig> = {};

let groupOrder: string[] = [];

let breakpoints: Record<string, BreakpointConfig> = {};

/**
 * BuilderRegistry class for managing block configurations
 * Implemented as a singleton
 */
export class BuilderRegistry {
  // Static instance property to hold the single instance
  private static instance: BuilderRegistry | null = null;

  // Private constructor to prevent direct instantiation
  private constructor() {
    if (BuilderRegistry.instance) {
      throw new Error("Use BuilderRegistry.getInstance() to get the instance");
    }
    BuilderRegistry.instance = this;
  }

  // Static method to get the instance
  public static getInstance(): BuilderRegistry {
    // Create the instance if it doesn't exist
    if (!BuilderRegistry.instance) {
      BuilderRegistry.instance = new BuilderRegistry();
    }

    // Return the instance
    return BuilderRegistry.instance;
  }

  /**
   * Register multiple blocks at once
   * @param blocks - Array of block configurations to register
   */
  registerBlocks(blocks: BlockConfig[]) {
    blocks.forEach((block) => {
      this.registerBlock(block);
    });
    return this;
  }

  /**
   * Register a single block configuration
   * @param block - Block configuration to register
   * @throws Error if the block type is already registered
   */
  registerBlock(block: BlockConfig) {
    if (registeredBlocks[block.type]) {
      throw new Error(`Block type "${block.type}" already registered`);
    }
    registeredBlocks[block.type] = block;

    return this;
  }

  getRegisteredBlocks(): Record<string, BlockConfig> {
    return registeredBlocks;
  }

  /**
   * Get all registered blocks
   * @returns Object containing all registered blocks
   */
  getBlocks(): BlockConfig[] {
    return Object.values(registeredBlocks);
  }

  /**
   * Get a block by its type
   * @param type - The type of the block to retrieve
   * @returns The block configuration if found, otherwise undefined
   */
  getBlock(type: string): BlockConfig {
    if (!registeredBlocks[type]) {
      throw new Error(`Block type "${type}" is not registered`);
    }

    return registeredBlocks[type];
  }

  /**
   * Get blocks by their group
   * @param group - The group to filter blocks by
   * @returns Array of blocks that belong to the specified group
   */
  getBlocksByGroup(group: string): BlockConfig[] {
    return Object.values(registeredBlocks).filter((block) => block.group === group);
  }

  /**
   * Get all registered block types
   * @returns Array of block type strings
   */
  getBlockTypes(): string[] {
    return Object.keys(registeredBlocks);
  }

  /**
   * Get all registered groups
   * @returns Array of group configurations
   */
  setGroupsOrder(groups: string[]) {
    groupOrder = groups;
    return this;
  }

  /**
   * Get the order of registered groups
   * @returns Array of block groups in the order they were registered
   */
  getGroupsOrder(): string[] {
    return groupOrder;
  }

  /**
   * Get the order index of a specific group
   * @param group - The group to find the order index for
   * @returns The index of the group in the registered order, or -1 if not found
   */
  getGroupOrder(group: string): number {
    return groupOrder.indexOf(group);
  }

  /**
   * Get all registered breakpoints
   * @returns Object containing all registered breakpoints
   */
  registerBreakpoints(breakpoints: BreakpointConfig[]) {
    breakpoints.forEach((breakpoint) => {
      this.registerBreakpoint(breakpoint);
    });

    return this;
  }

  /**
   * Register a single breakpoint configuration
   * @param breakpoint - The breakpoint configuration to register
   * @throws Error if the breakpoint key is already registered
   */
  registerBreakpoint(breakpoint: BreakpointConfig) {
    if (breakpoints[breakpoint.key]) {
      throw new Error(`Breakpoint "${breakpoint.key}" is already registered`);
    }
    breakpoints[breakpoint.key] = breakpoint;

    return this;
  }

  /**
   * Get a specific breakpoint by its key
   * @param key - The key of the breakpoint to retrieve
   * @returns The breakpoint configuration if found, otherwise undefined
   */
  getBreakpoint(key: string): BreakpointConfig {
    if (!breakpoints[key]) {
      throw new Error(`Breakpoint "${key}" is not registered`);
    }
    return breakpoints[key];
  }

  /**
   * Get all registered breakpoints
   * @returns Array of all registered breakpoint configurations
   */
  getBreakpoints(): BreakpointConfig[] {
    return Object.values(breakpoints);
  }
  /**
   * Get a media query string for a specific breakpoint
   * @param key - The key of the breakpoint to generate the media query for
   * @returns Media query string for the specified breakpoint
   */
  getMediaQuery(key: string): string {
    const breakpoint = this.getBreakpoint(key);
    return `@media (max-width: ${breakpoint.maxWidth}px) and (min-width: ${breakpoint.minWidth}px)`;
  }

  /**
   * Merge custom configuration with existing configuration
   * @param config - Custom builder configuration to merge
   * @returns The BuilderRegistry instance for method chaining
   */
  mergeConfig(config: BuilderConfig): BuilderRegistry {
    // Process blocks if provided
    if (config.blocks && config.blocks.length > 0) {
      // For each block in the config
      config.blocks.forEach((block) => {
        // Add a type guard to ensure block.type is defined
        if (block.type) {
          const existingBlock = registeredBlocks[block.type];

          if (existingBlock) {
            // If a block already exists, deep merge it with the existing one
            registeredBlocks[block.type] = deepmerge(existingBlock, block);
          } else {
            // If a block doesn't exist, register it
            // Check if block has all required properties to be a complete BlockConfig
            if (
              block.label !== undefined &&
              block.component !== undefined &&
              block.settings !== undefined &&
              block.controls !== undefined
            ) {
              this.registerBlock(block as BlockConfig);
            } else {
              console.warn(
                `Block "${block.type}" is missing required properties and cannot be registered`
              );
            }
          }
        } else {
          // Handle blocks with undefined type
          console.warn("Block with undefined type encountered and skipped");
        }
      });
    }

    // Process groups if provided - OVERRIDE existing order
    if (config.groups && config.groups.length > 0) {
      // Completely replace the existing group order with the new one
      this.setGroupsOrder(config.groups);
    }

    // Process breakpoints if provided
    if (config.breakpoints && config.breakpoints.length > 0) {
      // For each breakpoint in the config
      config.breakpoints.forEach((breakpoint) => {
        // Add a type guard to ensure breakpoint.key is defined
        if (breakpoint.key !== undefined) {
          const existingBreakpoint = breakpoints[breakpoint.key];

          if (existingBreakpoint) {
            // If breakpoint already exists, deep merge it with the existing one
            breakpoints[breakpoint.key] = deepmerge(existingBreakpoint, breakpoint);
          } else {
            // If breakpoint doesn't exist, register it
            // Check if breakpoint has all required properties to be a complete BreakpointConfig
            if (
              breakpoint.label !== undefined &&
              breakpoint.icon !== undefined &&
              breakpoint.previewWidth !== undefined &&
              breakpoint.maxWidth !== undefined &&
              breakpoint.minWidth !== undefined
            ) {
              this.registerBreakpoint(breakpoint as BreakpointConfig);
            } else {
              console.warn(
                `Breakpoint "${breakpoint.key}" is missing required properties and cannot be registered`
              );
            }
          }
        } else {
          // Handle breakpoints with an undefined key
          console.warn("Breakpoint with undefined key encountered and skipped");
        }
      });
    }

    return this;
  }
}
