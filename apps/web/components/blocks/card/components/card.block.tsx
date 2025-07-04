"use client";

import { BlockProps } from "@dndbuilder.com/react";
import { FC } from "react";
import { CardSettingsType } from "../types";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const CardBlock: FC<BlockProps<CardSettingsType>> = ({ settings, meta }) => {
  const locale = meta?.locale || "en";

  return (
    <Card className="card w-[350px]">
      {settings.image && (
        <Image
          src={settings.image.url || ""}
          alt={settings.image.altText || "Card Image"}
          width={settings.image.originalHeight || 100}
          height={settings.image.originalWidth || 100}
          className="card-image mb-4"
        />
      )}

      <Card.Content className="card-content">
        <Card.Title className="card-title">
          {settings.title?.text?.[locale] || "Card Title"}
        </Card.Title>

        <Card.Description className="card-description">
          {settings.description?.content?.[locale] || "Card Description"}
        </Card.Description>

        {settings.link && (
          <Link href={settings.link.url || "#"} className="card-link">
            {settings.link.text?.[locale]}
          </Link>
        )}
      </Card.Content>
    </Card>
  );
};

export default CardBlock;
