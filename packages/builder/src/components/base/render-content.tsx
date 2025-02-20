import { Block, BlockMeta } from "@/types/block";
import { generateBlockTree } from "@/utils/block";
import { FC } from "react";
import RenderBlock from "./render-block";

type RenderContentProps = {
  content: Record<string, Block>;
  meta: BlockMeta;
};

const RenderContent: FC<RenderContentProps> = ({ content, meta }) => {
  const tree = generateBlockTree("root", content);

  const root = tree["root"];

  if (!root) {
    return null;
  }

  return (
    <>
      <main>
        {root.children.map(
          (block, index) =>
            typeof block !== "string" && (
              <RenderBlock
                index={index}
                block={block}
                key={block.id}
                meta={meta}
              />
            )
        )}
      </main>
    </>
  );
};

export default RenderContent;
