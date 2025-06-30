# DnD Page Builder

A powerful drag-and-drop page builder for React applications. This package provides a comprehensive set of components, hooks, and utilities for building customizable page editors with a block-based approach.

## Features

- 🧩 **Block-Based Architecture**: Build pages using pre-defined or custom blocks
- 🖱️ **Drag and Drop Interface**: Intuitive drag-and-drop functionality using React DND
- 🔄 **Undo/Redo Support**: Built-in history management with Redux Undo
- 📱 **Responsive Design**: Create responsive layouts that work across devices
- 🎨 **Customizable UI**: Extensive styling options with Tailwind CSS
- 🧰 **Extensible API**: Easily extend with custom blocks and functionality
- 🔌 **Plugin System**: Support for third-party plugins and extensions
- 📦 **Tree-Shakable**: Import only what you need

## Installation

```bash
# Using npm
npm install @dndbuilder.com/react

# Using yarn
yarn add @dndbuilder.com/react

# Using pnpm
pnpm add @dndbuilder.com/react
```

## Quick Start

```jsx
import React from "react";
import { Builder, BuilderProvider } from "@dndbuilder.com/react";
import "@dndbuilder.com/react/dist/style.css";

function App() {
  return (
    <BuilderProvider blocks={myBlockConfigs}>
      <Builder />
    </BuilderProvider>
  );
}

export default App;
```

## Saving Content

To save content, you can use the `useContent` hook to access the editor state.

```jsx
import { useContent } from "@dndbuilder.com/react";
function MyComponent() {
  const { content, saveContent } = useContent();

  const handleSave = () => {
    // Save content to your backend or local storage
    console.log("Saving content:", content);
    saveContent();
  };

  return <button onClick={handleSave}>Save Content</button>;
}
```

## Rendering Content

To render content on the frontend, use the `RenderContent` component.

```jsx
import { RenderContent } from "@dndbuilder.com/react/components/server";
async function MyPage() {
  const content = await fetchContent(); // Fetch content from your backend
  return <RenderContent content={content} />;
}
```

## Customizing Blocks

The page builder allows you to create custom blocks or override existing block configurations.

### Creating a Custom Block

To create a custom block, you need to:

1. Create a component for your block
2. Define the block configuration
3. Pass the configuration to the BuilderProvider

```jsx
import React from "react";
import { BlockProps, BlockType, BlockGroup } from "@dndbuilder.com/react";

// 1. Create your block component
const MyCustomBlock = ({ settings, meta }) => {
  return (
    <div className="my-custom-block">
      <h3>{settings.title}</h3>
      <p>{settings.description}</p>
    </div>
  );
};

// 2. Define your block configuration
const myCustomBlockConfig = {
  type: "my-custom-block", // Unique identifier for your block
  label: "My Custom Block", // Display name in the block picker
  component: MyCustomBlock, // Component used in the editor
  previewComponent: MyCustomBlock, // Component used for preview (can be different)
  settings: {
    title: "Default Title",
    description: "Default description",
  },
  group: BlockGroup.BASIC, // Which group to show this block in
  controls: [], // Define controls for the block settings
};

// 3. Pass the configuration to the BuilderProvider
function App() {
  const builderConfig = {
    blocks: [myCustomBlockConfig],
  };

  return (
    <BuilderProvider builderConfig={builderConfig}>
      <Builder />
    </BuilderProvider>
  );
}
```

### Overriding an Existing Block

You can override the configuration of an existing block by providing a partial configuration with the same block type:

```jsx
import React from "react";
import { BlockProps, BlockType } from "@dndbuilder.com/react";
import { RenderContent } from "@dndbuilder.com/react/components/server";

// Create a custom component for the Link block
const CustomLinkBlock = ({ settings, meta }) => {
  const locale = meta?.locale || "en";

  return (
    <a
      href={settings.link?.url || "#"}
      target={settings.link?.newWindow ? "_blank" : undefined}
      className="my-custom-link-style"
    >
      {settings.text?.[locale]}
    </a>
  );
};

// Override the Link block configuration
const builderConfig = {
  blocks: [
    {
      type: BlockType.LINK, // Use the existing block type
      previewComponent: CustomLinkBlock, // Override only the preview component
    },
  ],
};

// Use the custom configuration when rendering content
function PreviewPage() {
  const content = fetchContent();
  return <RenderContent content={content} builderConfig={builderConfig} />;
}
```

You can override any property of an existing block, including:

- `component`: The component used in the editor
- `previewComponent`: The component used for preview
- `settings`: Default settings for the block
- `controls`: Controls for the block settings
- `style`: Function to generate CSS styles for the block

The custom configuration is deep-merged with the existing configuration, so you only need to specify the properties you want to override.
