import { Block, BlockMeta, BlockProps } from "@/types/block";
import { classNames } from "@/utils";

/**
 * Generates props for a block component
 * @param options - The options for generating block props
 * @param options.block - The block to generate props for
 * @param options.index - The index of the block
 * @param options.isEditable - Whether the block is editable
 * @param options.meta - Additional metadata for the block
 * @returns The generated block props
 */
export const generateBlockProps = ({
  block,
  index,
  isEditable = false,
  meta,
}: {
  block: Block;
  index: number;
  isEditable?: boolean;
  meta?: BlockMeta;
}): BlockProps => {
  const blockId = block.id;

  const attributes: BlockProps["attributes"] = {
    className: classNames(
      block.advancedSettings?.cssClasses,
      block.advancedSettings?.hideOnDesktop && "hide-on-desktop",
      block.advancedSettings?.hideOnTablet && "hide-on-tablet",
      block.advancedSettings?.hideOnMobile && "hide-on-mobile"
    ),
    ["data-block-id"]: `${blockId}`,
    ["data-block-type"]: `${block.type}`,
  };

  if (block.advancedSettings?.cssId) {
    attributes["id"] = block.advancedSettings?.cssId;
  }

  if (block.advancedSettings?.customAttributes) {
    block.advancedSettings?.customAttributes?.forEach((attr) => {
      if (!attr.value || !attr.name) return;

      if (attr.name === "class") {
        attributes["className"] = classNames(
          blockId,
          block.advancedSettings?.cssClasses,
          attr.value
        );
        return;
      }

      if (attr.name === "id") {
        attributes["id"] = attr.value;
        return;
      }

      attributes[attr.name] = attr.value;
    });
  }

  return {
    ...block,
    index,
    attributes,
    isEditable,
    meta,
  };
};

/**
 * Recursively generates a tree structure from flat block data
 * @param root - The ID of the root block
 * @param data - A record of blocks indexed by their IDs
 * @returns A tree structure of blocks
 */
export const generateBlockTree = (
  root: string,
  data: Record<string, Block>
): Record<string, Block> => {
  const tree: Record<string, Block> = {};

  const rootBlock = data[root];

  if (!rootBlock) {
    return tree;
  }

  tree[root] = {
    ...rootBlock,
    children: [],
  };

  if (rootBlock.children) {
    rootBlock.children.forEach((child) => {
      const childTree = generateBlockTree(child as string, data);
      tree[root].children.push(childTree[child as string]);
    });
  }

  return tree;
};
