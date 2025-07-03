"use client";

import { BlockProps } from "@dndbuilder.com/react";
import { FC } from "react";
import { CardSettingsType } from "../types";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const CardBlock: FC<BlockProps<CardSettingsType>> = ({ settings, meta }) => {
  const locale = meta?.locale || "en";

  return (
    <Card>
      <Card.Header>
        <Card.Title>{settings.title?.text?.[locale] || "Card Title"}</Card.Title>
      </Card.Header>

      <Card.Content>
        {settings.image && (
          <Image
            src={settings.image.url || ""}
            alt={settings.image.altText || "Card Image"}
            width={settings.image.width || 100}
            height={settings.image.height || 100}
            className="mb-4"
          />
        )}
        <Card.Description>
          {settings.description?.content?.[locale] || "Card Description"}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default CardBlock;
