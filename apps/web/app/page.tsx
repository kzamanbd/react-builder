"use client";

import React from "react";
import { Builder, Header } from "@repo/builder";
import { Button } from "@repo/builder";
import "@repo/builder/dist/style.css";

export default function HomePage() {
  return (
    <div>
      {/* <Header text="Page Builder" />
      <Button>Click me</Button> */}
      <Builder
        content={{}}
        theme={{ name: "Storefront", id: 1, settings: {} }}
      />
    </div>
  );
}
