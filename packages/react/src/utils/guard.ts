import { DroppableBlock, MoveableBlock } from "@/types/block";
import { ResponsiveValue } from "@/types/responsive";
import { SpacingValue, UnitValue, WithPseudoClass } from "@/types/style";

/**
 * Type guard to check if an object is a DroppableBlock
 * @param block - The object to check
 * @returns True if the object is a DroppableBlock, false otherwise
 */
export const isDropableBlock = (block: unknown): block is DroppableBlock => {
  return typeof block === "object" && block !== null && "type" in block && "settings" in block;
};

/**
 * Type guard to check if an object is a MoveableBlock
 * @param block - The object to check
 * @returns True if the object is a MoveableBlock, false otherwise
 */
export const isMoveableBlock = (block: unknown): block is MoveableBlock => {
  return (
    typeof block === "object" &&
    block !== null &&
    "id" in block &&
    "parentId" in block &&
    "index" in block
  );
};

/**
 * Type guard to check if an object is a UnitValue
 * @param value - The object to check
 * @returns True if the object is a UnitValue, false otherwise
 */
export const isUnitValue = (value: unknown): value is UnitValue => {
  return (
    typeof value === "object" &&
    value !== null &&
    value !== undefined &&
    "value" in value &&
    "unit" in value
  );
};

/**
 * Type guard to check if an object is a SpacingValue
 * @param value - The object to check
 * @returns True if the object is a SpacingValue, false otherwise
 */
export const isSpacingValue = (value: unknown): value is SpacingValue => {
  return (
    typeof value === "object" &&
    value !== null &&
    ("top" in value ||
      "right" in value ||
      "bottom" in value ||
      "left" in value ||
      "unit" in value ||
      "linked" in value)
  );
};

/**
 * Type guard to check if an object is a ResponsiveValue
 * @param value - The object to check
 * @returns True if the object is a ResponsiveValue, false otherwise
 */
export const isResponsiveValue = (value: unknown): value is ResponsiveValue => {
  return (
    typeof value === "object" &&
    value !== null &&
    ("mobile" in value ||
      "mobile-landscape" in value ||
      "tablet" in value ||
      "tablet-landscape" in value ||
      "laptop" in value ||
      "desktop" in value ||
      "widescreen" in value)
  );
};

/**
 * Type guard to check if an object has pseudo-class properties
 * @param value - The object to check
 * @returns True if the object has pseudo-class properties, false otherwise
 */
export const isWithPseudoClass = (value: unknown): value is WithPseudoClass => {
  return (
    typeof value === "object" &&
    value !== null &&
    ("default" in value ||
      "hover" in value ||
      "focus" in value ||
      "active" in value ||
      "visited" in value ||
      "disabled" in value)
  );
};
